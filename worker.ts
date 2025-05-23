import { URI as Uri } from "monaco-editor/esm/vs/base/common/uri.js"
import {
	type ICreateData,
	TypeScriptWorker,
	initialize,
} from "monaco-editor/esm/vs/language/typescript/ts.worker.js"
import ts from "typescript"

export class CustomTSWorker extends TypeScriptWorker {
	fileEntries = new Map<string, string>()
	urlEntries = new Map<string, string>()

	constructor(
		ctx: import("monaco-editor").worker.IWorkerContext,
		createData: ICreateData,
	) {
		super(ctx, createData)

		console.log(
			"[CustomTSWorker] Constructor started. Populating fileEntries...",
		)
		this.fileEntries = new Map<string, string>()
	}

	readFile(path: string) {
		console.log("Reading file:", path)
		const file = super.readFile(path) || this.fileEntries.get(path)
		return file
	}

	urlList() {
		return Object.keys(Object.fromEntries(this.fileEntries))
	}

	fileExists(path: string) {
		const exists = super.fileExists(path) || this.fileEntries.has(path)

		return exists
	}

	getScriptFileNames() {
		const fileNames = super
			.getScriptFileNames()
			.concat([...this.fileEntries.keys()])

		return fileNames
	}

	_getModel(fileName: string) {
		const model = super._getModel(fileName) || this.asModel(fileName)
		return model
	}

	_getScriptText(fileName: string) {
		const text =
			super._getScriptText(fileName) || this.fileEntries.get(fileName)
		return text
	}

	asModel(fileName: string) {
		const txt = this.fileEntries.get(fileName)
		if (!txt) {
			return null
		}
		return {
			getValue() {
				return txt
			},
			uri: Uri.parse(fileName),
			version: 1,
		}
	}

	addFile(path: string, content: string) {
		console.log(`[addFile] Adding file with key: "${path}"`)

		this.fileEntries.set(path, content)
	}

	addUrl(path: string, content: string) {
		this.urlEntries.set(path, content)
	}
	resolveModuleNames = (
		moduleNames: string[],
		containingFile: string,
		reusedNames: string[] | undefined,
		redirectedReference: ts.ResolvedProjectReference | undefined,
		options: ts.CompilerOptions,
	): Array<ts.ResolvedModule | undefined> => {
		const resolvedModules = []
		const basePath = "inmemory://model/node_modules/"

		console.log(
			`[CustomTSWorker] resolveModuleNames triggered for ${containingFile}. Resolving: ${moduleNames}`,
		)

		for (const moduleName of moduleNames) {
			let resolvedModule = undefined

			if (moduleName.includes("esm.sh")) {
				const correctPath = this.urlEntries.get(moduleName)
				const exactPath = Array.from(this.fileEntries.keys()).filter((key) => {
					return key.startsWith(basePath + moduleName)
				})
				resolvedModule = {
					resolvedFileName: correctPath ? basePath + correctPath : exactPath[0],
					extension: ts.Extension.Dts,
					isExternalLibraryImport: true,
				}
			} else {
				const standardResult = ts.resolveModuleName(
					moduleName,
					containingFile,
					options,
					this,
				)
				if (
					standardResult.resolvedModule === undefined &&
					standardResult.failedLookupLocations.length > 0
				) {
					standardResult.failedLookupLocations.forEach((location) => {
						location = location.replace("https:/", "https://")
						if (this.fileEntries.get(location)) {
							resolvedModule = {
								resolvedFileName: location,
								extension: ts.Extension.Dts,
								isExternalLibraryImport: true,
							}
						}
					})
				} else if (standardResult.resolvedModule) {
					resolvedModule = standardResult.resolvedModule
				}
			}
			resolvedModules.push(resolvedModule) // 찾았으면 ResolvedModule 객체, 못 찾았으면 undefined 추가
		}

		return resolvedModules
	}
}

self.onmessage = () => {
	try {
		initialize(
			(
				ctx: import("monaco-editor").worker.IWorkerContext,
				createData: ICreateData,
			) => {
				return new CustomTSWorker(ctx, createData)
			},
		)
	} catch (error) {
		console.error("[CustomTSWorker] Error during worker initialization:", error)
	}
}
//entry파일을 하나 찾음
//이 안에있는 import문들을 다 하나씩 모듈해석을 보내는데 -> 왜 추가를해도안되지

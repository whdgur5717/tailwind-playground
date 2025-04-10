import { URI as Uri } from "monaco-editor/esm/vs/base/common/uri.js"
import {
	TypeScriptWorker,
	initialize,
} from "monaco-editor/esm/vs/language/typescript/ts.worker.js"
import ts from "typescript"
export class CustomTSWorker extends TypeScriptWorker {
	fileEntries = new Map()
	urlEntries = new Map()

	constructor(ctx, createData) {
		super(ctx, createData)
		console.log(
			"[CustomTSWorker] Constructor started. Populating fileEntries...",
		)
		this.fileEntries = new Map()
	}

	readFile(path) {
		console.log("Reading file:", path)
		const file = super.readFile(path) || this.fileEntries.get(path)
		return file
	}

	fileExists(path) {
		const exists = super.fileExists(path) || this.fileEntries.has(path)
		return exists
	}

	getScriptFileNames() {
		const fileNames = super
			.getScriptFileNames()
			.concat([...this.fileEntries.keys()])
		return fileNames
	}

	_getModel(fileName) {
		const model = super._getModel(fileName) || this.asModel(fileName)
		return model
	}

	_getScriptText(fileName) {
		const text =
			super._getScriptText(fileName) || this.fileEntries.get(fileName)
		return text
	}

	asModel(fileName) {
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

	addFile(path, content) {
		this.fileEntries.set(path, content)
	}

	addUrl(path, content) {
		this.urlEntries.set(path, content)
		console.log(this.urlEntries)
	}

	resolveModuleNames(
		moduleNames,
		containingFile,
		reusedNames,
		redirectedReference,
		options,
		containingSourceFile,
	) {
		const resolvedModules = []
		const basePath = "inmemory://model/node_modules/"

		console.log(
			`[CustomTSWorker] resolveModuleNames triggered for ${containingFile}. Resolving: ${moduleNames.join(
				", ",
			)}`,
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
					this, // <- 중요: host로 'this'를 전달하여 해당 class의 메서드를 사용하게 할수 있는듯
				)
				if (standardResult.resolvedModule) {
					resolvedModule = standardResult.resolvedModule
				}
			}

			resolvedModules.push(resolvedModule) // 찾았으면 ResolvedModule 객체, 못 찾았으면 undefined 추가
		}

		return resolvedModules
	}
}

self.onmessage = (e) => {
	try {
		initialize((ctx, createData) => {
			return new CustomTSWorker(ctx, createData)
		})
	} catch (error) {
		console.error("[CustomTSWorker] Error during worker initialization:", error)
	}
}

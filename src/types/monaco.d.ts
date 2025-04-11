//worker.ts에서 import하고 있는 경로 이외로는 불러올 수가 없음 -> 현재 import경로에서 타입 추론이 되지 않음
//package.json의 types, monaco-editor의 여러 d.ts를 살펴봐도 명시되지 않은 타입들이 많음 -> import문을 변경해도 추론되지 않는 타입들이 존재
//타입 추론이 가능하게끔 d.ts파일을 직접 정의
//최대한 패키지에서 제공하는 타입 사용. 없는 경우에는 소스코드 내부에서 찾아서 제일 유사하게 사용
//typescript lint error를 막기위한 임시 조치일 뿐

declare module "monaco-editor/esm/vs/base/common/uri.*" {
	export const URI: typeof monaco.Uri
}
//https://github.com/microsoft/monaco-editor/blob/main/src/language/typescript/tsWorker.ts
declare module "monaco-editor/esm/vs/language/typescript/ts.worker.*" {
	interface ICreateData {
		compilerOptions: import("typescript").CompilerOptions
		extraLibs: monaco.languages.typescript.IExtraLibs
		customWorkerPath?: string
		inlayHintsOptions?: import("typescript").UserPreferences
	}
	export class TypeScriptWorker
		implements
			monaco.languages.typescript.TypeScriptWorker,
			ts.LanguageServiceHost
	{
		constructor(
			ctx: import("monaco-editor").worker.IWorkerContext,
			createData: ICreateData,
		)
		fileExists(path: string): boolean
		readFile(path: string): string | undefined
		getScriptFileNames(): string[]
		_getModel(fileName: string): monaco.worker.IMirrorModel | null
		_getScriptText(fileName: string): string | undefined
		asModel(fileName: string): null | {
			getValue(): string
			uri: monaco.Uri
			version: number
		}
		resolveModuleNames: import("typescript").CompilerHost["resolveModuleNames"]
		//custom method
		addFile(path: string, content: string): void
		addUrl(path: string, content: string): void
	}

	export function initialize(
		callback: (
			ctx: monaco.worker.IWorkerContext, // monaco.worker.IWorkerContext 타입
			createData: {
				// ICreateData 인터페이스의 핵심 구조 (또는 미리 정의된 ICreateData 타입)
				compilerOptions: ts.CompilerOptions
				extraLibs: { [path: string]: { content: string; version: number } }
				customWorkerPath?: string
				inlayHintsOptions?: ts.UserPreferences
				// 필요한 다른 속성들...
			},
		) => TypeScriptWorker,
	): void
}

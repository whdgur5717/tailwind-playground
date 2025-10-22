# Monaco ESM Playground

브라우저에서 동작하는 React + TypeScript 코드 플레이그라운드입니다.
**TypeScript Compiler API**를 활용하여 동적으로 추가되는 ESM 패키지에 대한 타입 지원을 제공합니다.

## 🎯 핵심 기술

### Custom TypeScript Worker 구현

일반적인 코드 플레이그라운드는 사전에 설정된 타입 정의만 사용할 수 있습니다.
이 프로젝트는 **TypeScript Language Service API**를 직접 활용하여 런타임에 추가되는 패키지의 타입도 지원합니다.

```typescript
// worker.ts - CustomTSWorker 클래스
export class CustomTSWorker extends TypeScriptWorker {
  fileEntries = new Map<string, string>()  // 가상 파일 시스템
  urlEntries = new Map<string, string>()   // URL 매핑

  // TypeScript의 모듈 해석을 커스터마이징
  resolveModuleNames(moduleNames, containingFile, ...) {
    if (moduleName.includes("esm.sh")) {
      const typePath = this.urlEntries.get(moduleName);
      return { resolvedFileName: `inmemory://model/node_modules/${typePath}` };
    }
  }
}
```

### 주요 구현 내용

1. **가상 파일 시스템**
   - `fileEntries` Map에 `.d.ts` 파일 내용을 메모리에 저장
   - `readFile()`, `fileExists()` 등을 오버라이드하여 가상 파일을 실제 파일처럼 사용

2. **커스텀 모듈 해석**
   - `resolveModuleNames()` 메서드를 구현하여 `esm.sh` URL을 타입 정의 파일로 매핑
   - TypeScript 컴파일러가 `import` 구문을 만나면 자동으로 호출됨

3. **재귀적 타입 의존성 처리**
   - `ts.preProcessFile()` API로 `.d.ts` 파일의 모든 의존성 추출
   - `/// <reference>`, `import` 구문을 재귀적으로 처리하여 모든 타입 파일 다운로드

4. **X-Typescript-Types 헤더 활용**
   - esm.sh의 HTTP 헤더에서 타입 정의 URL 자동 추출
   - CDN에서 타입 파일을 동적으로 로드

## 🔄 동작 과정

```
사용자가 패키지 추가 (예: "lodash")
    ↓
esm.sh에서 X-Typescript-Types 헤더 읽기
    ↓
타입 정의 파일(.d.ts) 재귀적으로 다운로드
    ↓
CustomTSWorker의 fileEntries에 저장
    ↓
resolveModuleNames()가 import 구문 해석
    ↓
Monaco Editor에서 자동완성 제공 ✨
```

## ✨ 기능

- 📝 **실시간 타입 체크**: 동적으로 추가된 패키지에 대한 IntelliSense 지원
- 🔄 **라이브 프리뷰**: esbuild-wasm 기반 브라우저 번들링
- 🎨 **Tailwind CSS**: 런타임 CSS 생성 통합
- 📦 **ESM 지원**: `esm.sh` URL 직접 import 가능
- 🚀 **백엔드 불필요**: 모든 기능이 브라우저에서 동작

## 🛠️ 기술 스택

- **monaco-editor 0.52.2** - 코드 에디터
- **typescript 5.7.3** - Compiler API 활용
- **mobx 6.13.7** - 상태 관리
- **react 19.0.0** - UI 프레임워크
- **esbuild-wasm** - 브라우저 번들러
- **@tailwindcss/vite 4.1.1** - CSS 프레임워크

## 🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

## 📚 상세 문서

- [`/docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) - UI 구조와 데이터 플로우
- [`/docs/WORKER_DETAILED.md`](./docs/WORKER_DETAILED.md) - worker.ts 상세 설명
- [`/CLAUDE.md`](./CLAUDE.md) - 개발 가이드라인

---

TypeScript Compiler API와 Monaco Editor의 확장성을 활용한 프로젝트입니다.

# worker.ts 상세 설명

## 🎯 worker.ts의 핵심 역할

**worker.ts는 "가상 파일 시스템 + TypeScript 모듈 해석기"입니다.**

이 파일은 Monaco Editor의 TypeScript Language Service가 ESM 패키지의 타입 정의를 찾을 수 있도록 도와주는 커스텀 워커입니다.

---

## 📦 1. 두 개의 핵심 저장소

```typescript
export class CustomTSWorker extends TypeScriptWorker {
  fileEntries = new Map<string, string>();  // 파일 저장소
  urlEntries = new Map<string, string>();   // URL 매핑 저장소
```

### **fileEntries** - 실제 파일 내용 저장
```javascript
// 예시 데이터
fileEntries = {
  "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../react/index.d.ts": "export declare function useState...",
  "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../react-dom/index.d.ts": "export declare function render..."
}
```

**역할:**
- 다운로드한 `.d.ts` 파일의 실제 내용을 저장
- 가상 경로(`inmemory://model/node_modules/...`)를 키로 사용
- TypeScript가 파일을 읽을 때 이 Map에서 내용을 제공

### **urlEntries** - URL 매핑 정보
```javascript
// 예시 데이터
urlEntries = {
  "https://esm.sh/react": "https://cdn.jsdelivr.net/.../react/index.d.ts",
  "https://esm.sh/lodash": "https://cdn.jsdelivr.net/.../lodash/index.d.ts"
}
```

**역할:**
- ESM 패키지 URL과 타입 정의 파일 URL을 매핑
- `X-Typescript-Types` 헤더에서 얻은 정보 저장
- 모듈 해석 시 올바른 타입 파일을 찾는데 사용

---

## 🔄 2. 패키지 추가 시 전체 플로우

### **Step 1: 사용자가 "lodash" 입력**
```
editorForm.tsx에서 "lodash" 입력 → "Add" 버튼 클릭
```

### **Step 2: editorForm.tsx의 addPackage() 실행**
```typescript
// 1. URL 구성
const packageUrl = "https://esm.sh/lodash"

// 2. fetch로 패키지 요청
const response = await fetch("https://esm.sh/lodash")

// 3. X-Typescript-Types 헤더 추출
const typePath = response.headers.get("X-Typescript-Types")
// 예: "https://cdn.jsdelivr.net/npm/@types/lodash@4.14.195/index.d.ts"
```

**X-Typescript-Types 헤더란?**
- esm.sh가 제공하는 특별한 HTTP 헤더
- 해당 패키지의 TypeScript 타입 정의 파일 위치를 알려줌
- 표준 npm 패키지는 대부분 `@types/` 패키지로 연결됨

### **Step 3: Worker에 URL 매핑 저장**
```typescript
currentWorker.addUrl(packageUrl, typePath)

// worker.ts의 addUrl 메서드 실행 (line 80-82)
addUrl(path: string, content: string) {
    this.urlEntries.set(path, content);
}

// 결과:
urlEntries.set(
  "https://esm.sh/lodash",
  "https://cdn.jsdelivr.net/npm/@types/lodash@4.14.195/index.d.ts"
)
```

### **Step 4: 재귀적으로 모든 .d.ts 파일 수집**

**왜 재귀적으로?**
- 하나의 타입 정의 파일은 다른 파일들을 참조함
- 예: `react/index.d.ts` → `react/jsx-runtime.d.ts` 참조
- 모든 의존성을 다운로드해야 완전한 타입 지원 가능

```typescript
const importMap = {}

const processTypeFile = async (filePath) => {
  // 1. .d.ts 파일 다운로드
  const response = await fetch(filePath)
  const text = await response.text()
  importMap[filePath] = text

  // 2. TypeScript로 파싱하여 의존성 추출
  const refFiles = ts.preProcessFile(text, true, true)
  // ts.preProcessFile()은 파일 내의 모든 import, reference를 추출

  // 3. 재귀적으로 의존성 파일들도 fetch
  for (const reference of refFiles.referencedFiles) {
    // /// <reference path="..." /> 처리
    await processTypeFile(new URL(reference.fileName, filePath).href)
  }
  for (const file of refFiles.importedFiles) {
    // import { ... } from "..." 처리
    await processTypeFile(new URL(file.fileName, filePath).href)
  }
}

await processTypeFile(typePath)
```

**예시 결과:**
```javascript
importMap = {
  "https://cdn.jsdelivr.net/.../lodash/index.d.ts": "import { chain } from './chain'; ...",
  "https://cdn.jsdelivr.net/.../lodash/chain.d.ts": "export function chain...",
  "https://cdn.jsdelivr.net/.../lodash/common.d.ts": "export interface LoDashStatic..."
}
```

### **Step 5: Worker에 모든 파일 내용 저장**
```typescript
Object.entries(importMap).forEach(([key, value]) =>
  currentWorker.addFile(`inmemory://model/node_modules/${key}`, value)
)

// worker.ts의 addFile 메서드 실행 (line 74-78)
addFile(path: string, content: string) {
    console.log(`[addFile] Adding file with key: "${path}"`);
    this.fileEntries.set(path, content);
}
```

**최종 fileEntries 상태:**
```javascript
fileEntries = {
  "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../lodash/index.d.ts": "파일 내용...",
  "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../lodash/chain.d.ts": "파일 내용...",
  "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../lodash/common.d.ts": "파일 내용..."
}
```

**왜 `inmemory://model/node_modules/` 접두사?**
- Monaco/TypeScript는 실제 파일 시스템을 기대함
- `inmemory://` 프로토콜로 가상 파일임을 표시
- `node_modules/` 경로로 npm 패키지처럼 보이게 함

---

## 🔍 3. 모듈 해석 (resolveModuleNames) - 가장 중요!

### **언제 실행되나?**
사용자가 에디터에서 타이핑할 때:
```typescript
import { debounce } from 'https://esm.sh/lodash'
//                        ↑ 이 부분을 해석해야 함!
```

TypeScript Language Service가 "이 import를 어디서 찾지?"라고 물어보면 `resolveModuleNames`가 실행됩니다.

### **resolveModuleNames 메서드 시그니처**

```typescript
resolveModuleNames = (
  moduleNames: string[],              // 해석할 모듈 이름 배열
  containingFile: string,             // 어떤 파일에서 import 했는지
  reusedNames: string[] | undefined,  // 재사용 가능한 이름들
  redirectedReference: ...,           // 리다이렉트 참조
  options: ts.CompilerOptions         // 컴파일러 옵션
): Array<ts.ResolvedModule | undefined>
```

### **resolveModuleNames 실행 예시**

```typescript
resolveModuleNames(
  moduleNames: ["https://esm.sh/lodash"],  // 해석할 모듈 이름
  containingFile: "file:///main.tsx",      // 어디서 import 했는지
  ...
)
```

### **3가지 해석 전략:**

#### **전략 1: esm.sh URL 직접 매칭 (line 100-109)**
```typescript
if (moduleName.includes("esm.sh")) {
  // 1. urlEntries에서 실제 타입 경로 찾기
  const correctPath = this.urlEntries.get(moduleName);
  // "https://cdn.jsdelivr.net/.../lodash/index.d.ts"

  // 2. fileEntries에서 해당 파일이 있는지 확인
  const exactPath = Array.from(this.fileEntries.keys()).filter((key) => {
    return key.startsWith(basePath + moduleName);
  });

  // 3. 해석 결과 반환
  resolvedModule = {
    resolvedFileName: correctPath
      ? basePath + correctPath  // "inmemory://model/node_modules/https://cdn..."
      : exactPath[0],
    extension: ts.Extension.Dts,
    isExternalLibraryImport: true,
  };
}
```

**시각화:**
```
사용자 코드: import { debounce } from 'https://esm.sh/lodash'
                                        ↓
urlEntries 조회: "https://esm.sh/lodash"
                  → "https://cdn.jsdelivr.net/.../lodash/index.d.ts"
                                        ↓
fileEntries 조회: "inmemory://model/node_modules/https://cdn.jsdelivr.net/.../lodash/index.d.ts"
                                        ↓
TypeScript에게 알려줌: "이 경로에 타입 정의가 있어요!"
                                        ↓
Monaco Editor: 자동완성, 타입체크 가능!
```

#### **전략 2: 표준 TypeScript 해석 (line 111-116)**
```typescript
else {
  const standardResult = ts.resolveModuleName(
    moduleName,      // 예: "react", "./utils", "@types/node"
    containingFile,
    options,
    this            // fileExists, readFile 메서드 제공
  );
}
```

**언제 사용?**
- 상대 경로 import: `import { foo } from './utils'`
- npm 패키지 스타일: `import React from 'react'`
- TypeScript가 표준 Node.js 모듈 해석 규칙 적용

**this를 전달하는 이유:**
- TypeScript의 `resolveModuleName`은 파일 시스템 접근이 필요
- `this.fileExists()`, `this.readFile()` 메서드를 호출
- 우리의 가상 파일 시스템을 사용하도록 함

#### **전략 3: 실패한 경로 재시도 (Fallback) (line 117-133)**
```typescript
if (standardResult.resolvedModule === undefined &&
    standardResult.failedLookupLocations.length > 0) {

  standardResult.failedLookupLocations.forEach((location) => {
    // URL 정규화: "https:/" → "https://"
    location = location.replace("https:/", "https://");

    if (this.fileEntries.get(location)) {
      resolvedModule = {
        resolvedFileName: location,
        extension: ts.Extension.Dts,
        isExternalLibraryImport: true,
      };
    }
  });
}
```

**왜 필요한가?**
- TypeScript의 모듈 해석이 실패할 때의 보험
- URL 파싱 버그 수정: `https:/` → `https://`
- CDN URL이 예상치 못한 형태일 때 대비

**실제 사례:**
```typescript
// TypeScript가 시도한 경로들:
failedLookupLocations = [
  "https:/cdn.jsdelivr.net/.../react/index.d.ts",  // 잘못된 형식!
  "file:///node_modules/@types/react/index.d.ts"
]

// URL 정규화 후:
"https://cdn.jsdelivr.net/.../react/index.d.ts"  // 올바른 형식

// fileEntries에서 찾음!
```

---

## 🎨 4. Override 메서드들 - 가상 파일 시스템

CustomTSWorker는 TypeScript Worker의 여러 메서드를 오버라이드하여 가상 파일 시스템을 구현합니다.

### **readFile (line 25-29)** - 파일 읽기
```typescript
readFile(path: string) {
  console.log("Reading file:", path);
  // 1. 먼저 Monaco의 실제 모델 확인 (에디터에 열린 파일)
  const file = super.readFile(path)
    || this.fileEntries.get(path);  // 2. 없으면 가상 파일 시스템 조회
  return file;
}
```

**실행 흐름:**
1. 에디터에 열린 파일인가? (super.readFile)
2. 아니면 다운로드한 타입 파일인가? (fileEntries)

### **fileExists (line 35-39)** - 파일 존재 확인
```typescript
fileExists(path: string) {
  const exists = super.fileExists(path)  // 실제 파일 확인
    || this.fileEntries.has(path);        // 가상 파일 확인
  return exists;
}
```

**왜 중요한가?**
- TypeScript가 파일을 읽기 전에 존재 여부를 확인
- false를 반환하면 TypeScript는 해당 경로를 포기

### **getScriptFileNames (line 41-47)** - 모든 파일 목록
```typescript
getScriptFileNames() {
  // Monaco의 파일 + 가상 파일 시스템 파일 합치기
  const fileNames = super.getScriptFileNames()
    .concat([...this.fileEntries.keys()]);

  return fileNames;
}
```

**언제 사용?**
- Language Service가 전체 프로젝트 분석할 때
- "모든 파일을 알려줘"라고 요청할 때

### **_getModel (line 49-52)** - 모델 가져오기
```typescript
_getModel(fileName: string) {
  const model = super._getModel(fileName) || this.asModel(fileName);
  return model;
}
```

### **_getScriptText (line 54-58)** - 스크립트 텍스트 가져오기
```typescript
_getScriptText(fileName: string) {
  const text = super._getScriptText(fileName)
    || this.fileEntries.get(fileName);
  return text;
}
```

### **asModel (line 60-72)** - 가상 모델 생성
```typescript
asModel(fileName: string) {
  const txt = this.fileEntries.get(fileName);
  if (!txt) {
    return null;
  }

  // Monaco 모델 형태로 변환
  return {
    getValue() {
      return txt;
    },
    uri: Uri.parse(fileName),
    version: 1,
  };
}
```

**역할:**
- fileEntries의 문자열 데이터를 Monaco 모델 객체로 변환
- Monaco는 파일을 ITextModel 인터페이스로 다룸

---

## 📊 5. 전체 데이터 플로우 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 사용자가 "lodash" 패키지 추가                              │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. editorForm.tsx                                           │
│    - fetch("https://esm.sh/lodash")                         │
│    - X-Typescript-Types 헤더 추출                           │
│    - 재귀적으로 모든 .d.ts 파일 다운로드                      │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. worker.ts (CustomTSWorker)                               │
│                                                             │
│    addUrl() 호출:                                           │
│    urlEntries.set(                                          │
│      "https://esm.sh/lodash",                               │
│      "https://cdn.jsdelivr.net/.../lodash/index.d.ts"       │
│    )                                                        │
│                                                             │
│    addFile() 여러번 호출:                                    │
│    fileEntries.set(                                         │
│      "inmemory://model/node_modules/https://cdn...d.ts",    │
│      "파일 내용..."                                          │
│    )                                                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. 사용자가 에디터에서 타이핑                                 │
│    import { debounce } from 'https://esm.sh/lodash'        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. TypeScript Language Service                             │
│    "https://esm.sh/lodash를 해석해야 해!"                   │
│    → resolveModuleNames() 호출                              │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. resolveModuleNames()                                     │
│    ① urlEntries 조회                                        │
│       "https://esm.sh/lodash"                               │
│       → "https://cdn.jsdelivr.net/.../index.d.ts"           │
│                                                             │
│    ② fileEntries에서 파일 찾기                               │
│       "inmemory://model/node_modules/https://cdn...d.ts"    │
│                                                             │
│    ③ TypeScript에게 경로 알려줌                              │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. TypeScript가 파일 읽기 시도                               │
│    → readFile() 호출                                        │
│    → fileEntries에서 내용 반환                               │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Monaco Editor                                            │
│    - 자동완성 제공                                           │
│    - 타입 체크                                               │
│    - 함수 시그니처 표시                                       │
│    - 에러 표시                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 핵심 포인트 요약

### 1. **두 개의 저장소**
- `urlEntries`: "패키지 URL → 타입 파일 URL" 매핑 (주소록)
- `fileEntries`: "가상 경로 → 실제 .d.ts 파일 내용" 저장 (파일 시스템)

### 2. **resolveModuleNames의 3가지 전략**
- **전략 1**: esm.sh URL 직접 처리 (우리의 커스텀 로직)
- **전략 2**: 표준 TypeScript 해석 (상대 경로, npm 스타일)
- **전략 3**: 실패 시 재시도 (URL 정규화 + fallback)

### 3. **Override 메서드들**
TypeScript가 파일을 읽으려 할 때 가상 파일 시스템에서 제공:
- `readFile`: 파일 내용 읽기
- `fileExists`: 파일 존재 확인
- `getScriptFileNames`: 모든 파일 목록
- `_getModel`, `_getScriptText`: 모델/텍스트 가져오기

### 4. **워커 초기화 (line 142-158)**
```typescript
self.onmessage = () => {
  initialize((ctx, createData) => {
    return new CustomTSWorker(ctx, createData);
  });
};
```
- 단일 `onmessage` 핸들러로 워커 시작
- Monaco가 워커 준비 신호를 보내면 초기화
- 이후 모든 통신은 Monaco의 Worker 프로토콜 사용

---

## 🎓 비유로 이해하기

### **도서관 시스템 비유**

**urlEntries = 도서관 카탈로그**
- "해리포터" → "3층 B섹션 15번 선반"
- 책 제목(패키지 URL)을 입력하면 위치(타입 파일 URL) 알려줌

**fileEntries = 실제 서가와 책들**
- "3층 B섹션 15번 선반" → 실제 책 내용
- 위치(가상 경로)를 알면 책(파일 내용)을 읽을 수 있음

**resolveModuleNames = 사서**
- 이용자: "해리포터 찾아주세요"
- 사서: 카탈로그 확인 → 서가 찾아가서 책 가져옴

**Override 메서드들 = 대출 시스템**
- `fileExists`: 이 책이 도서관에 있나요?
- `readFile`: 이 책을 읽고 싶어요
- `getScriptFileNames`: 도서관에 있는 모든 책 목록 주세요

---

## 🐛 디버깅 팁

### **Console.log 활용**
```typescript
// worker.ts에 이미 있는 로그들:
console.log("[CustomTSWorker] Constructor started...")  // line 19
console.log("Reading file:", path)                       // line 26
console.log(`[addFile] Adding file with key: "${path}"`) // line 75
console.log(`[CustomTSWorker] resolveModuleNames...`)    // line 93-95
```

### **확인 사항**
1. **패키지 추가 후 fileEntries 확인**
   - 브라우저 콘솔에서 worker 로그 확인
   - `[addFile]` 로그가 여러 번 출력되는지 확인

2. **모듈 해석 실패 시**
   - `resolveModuleNames` 로그 확인
   - `urlEntries`에 매핑이 있는지 확인
   - `fileEntries`에 파일이 있는지 확인

3. **타입 체크가 안 될 때**
   - `readFile` 로그 확인
   - 경로 형식이 올바른지 확인 (`inmemory://model/node_modules/...`)

---

## 🚀 확장 가능성

### **현재 한계**
1. esm.sh만 지원 (unpkg, jsDelivr 등 미지원)
2. 패키지 삭제 기능 없음 (Map에서 제거만 하면 됨)
3. 캐싱 없음 (새로고침 시 다시 다운로드)

### **개선 아이디어**
1. IndexedDB에 타입 정의 캐싱
2. 여러 CDN 지원
3. 패키지 버전 관리
4. 의존성 그래프 시각화

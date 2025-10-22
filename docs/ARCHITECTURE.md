# 코드베이스 아키텍처 및 플로우 분석

## UI 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                     App.tsx (flex-row)                          │
├──────────────────────┬──────────────────────┬───────────────────┤
│                      │                      │                   │
│   Editor             │   Preview            │  EditorForm       │
│   (flex-1)           │   (flex-1)           │  (고정 너비)      │
│                      │                      │                   │
│   Monaco Editor      │   iframe             │  ┌─────────────┐ │
│   ┌────────────┐     │   ┌────────────┐     │  │   Input     │ │
│   │            │     │   │            │     │  └─────────────┘ │
│   │  Code      │     │   │  Live      │     │  ┌─────────────┐ │
│   │  Editor    │     │   │  Preview   │     │  │  타입 추가  │ │
│   │            │     │   │            │     │  └─────────────┘ │
│   │            │     │   │            │     │                   │
│   └────────────┘     │   └────────────┘     │                   │
│                      │                      │                   │
└──────────────────────┴──────────────────────┴───────────────────┘
```

## 프로젝트 개요

이 프로젝트는 Monaco Editor 기반 웹 코드 플레이그라운드로, TypeScript + React 코드 작성 시 ESM 패키지에 대한 완전한 타입 지원을 제공합니다. 모든 기능이 브라우저에서 실행되며, esbuild-wasm을 통한 번들링과 실시간 미리보기를 지원합니다.

## 상세 유저 플로우

### 1️⃣ 초기 로딩 플로우 (앱 시작 시)

```
사용자가 페이지 접속
    ↓
main.tsx: Monaco 환경 설정
    ↓
EditorForm useEffect 실행
    ↓
자동으로 기본 패키지 타입 로드
    - react/jsx-runtime
    - react
    - react-dom/client
    - es-toolkit
    ↓
Editor 컴포넌트: 기본 파일 3개로 Monaco 모델 생성
    - main.tsx (React 엔트리)
    - app.tsx (기본 컴포넌트)
    - styles.css (기본 스타일)
    ↓
Preview 컴포넌트: iframe에 초기 코드 렌더링
```

**사용자가 보는 화면:**
- 왼쪽: app.tsx 파일이 열린 Monaco 에디터 (VS Dark 테마)
- 가운데: "Test입니다" 텍스트가 파란색으로 표시된 미리보기
- 오른쪽: 패키지 URL 입력창과 "타입 추가" 버튼

---

### 2️⃣ 코드 편집 플로우

```
사용자가 Editor에서 코드 입력/수정
    ↓
editor.onDidChangeModelContent 이벤트 발생
    ↓
editorStore.updateFileContent() 호출
    - MobX 스토어 업데이트
    ↓
Preview 컴포넌트 자동 리렌더링 (observer)
    ↓
iframe 내부에서 esbuild-wasm 빌드 실행
    - virtual-fs 플러그인으로 파일 로드
    - main.tsx를 엔트리로 번들링
    ↓
번들된 코드를 <script type="module">로 실행
    ↓
React가 iframe의 #root에 렌더링
```

**사용자 경험:**
- 타이핑하면 실시간으로 미리보기 업데이트
- TypeScript 타입 체크 실시간 표시
- 자동완성 제공 (이미 로드된 패키지)

---

### 3️⃣ 새 패키지 타입 추가 플로우

```
사용자가 Input에 esm.sh URL 입력
예: "https://esm.sh/lodash"
    ↓
"타입 추가" 버튼 클릭
    ↓
editorForm.addPackage() 실행
    ↓
1. fetch(url)로 패키지 요청
    ↓
2. X-Typescript-Types 헤더 추출
   예: "https://cdn.jsdelivr.net/npm/@types/lodash/index.d.ts"
    ↓
3. currentWorker.addUrl(packageUrl, typeUrl) 호출
   - Worker의 urlEntries Map에 매핑 저장
    ↓
4. processTypeFile() 재귀 실행
   - .d.ts 파일 fetch
   - ts.preProcessFile()로 의존성 추출
   - 재귀적으로 모든 참조/import 파일 fetch
   - importMap에 캐싱 (중복 방지)
    ↓
5. 모든 파일을 currentWorker.addFile() 호출
   - inmemory://model/node_modules/ 경로로 저장
    ↓
Monaco Language Service 업데이트
    ↓
사용자가 Editor에서 lodash import 시
자동완성 + 타입체크 가능!
```

**사용자 경험:**
- lodash를 추가하면 `import { debounce } from 'https://esm.sh/lodash'` 작성 시
- 자동완성으로 `debounce` 함수 제안
- 함수 시그니처, 문서 표시
- 타입 오류 즉시 표시

---

### 4️⃣ 파일 전환 플로우 (현재 구현 안 됨)

**현재 상태:**
- `activeFileId` 상태는 존재 (`useState("app.tsx")`)
- 하지만 UI에 파일 탭/목록이 없음
- **사용자는 현재 파일을 전환할 수 없음**

**예상 구현 시 플로우:**
```
사용자가 파일 탭 클릭
    ↓
setActiveFileId(newFileId)
    ↓
useEffect 감지
    ↓
monaco.editor.getModel()로 모델 조회
    ↓
editor.setModel(newModel)
    ↓
에디터에 새 파일 내용 표시
```

---

### 5️⃣ 미리보기 실행 플로우 (자동)

```
MobX files 변경 감지 (코드 수정 시)
    ↓
Preview 컴포넌트 리렌더링
    ↓
새로운 srcDoc으로 iframe 재생성
    ↓
iframe 내부:
    ↓
1. Tailwind CSS 런타임 로드 (browser.js)
    ↓
2. Import map 설정
   {
     "react": "https://esm.sh/react",
     "react-dom": "https://esm.sh/react-dom",
     ...
   }
    ↓
3. esbuild-wasm 초기화
    ↓
4. main.tsx를 엔트리로 번들링
   - virtual-fs 플러그인으로 로컬 파일 로드
   - HTTP imports는 external 처리
    ↓
5. 번들된 JS를 <script type="module">로 주입
    ↓
6. React 코드 실행 → #root에 렌더링
    ↓
7. Tailwind CSS 클래스 자동 적용
```

**사용자 경험:**
- 코드 변경하면 약 1-2초 내 미리보기 업데이트
- esbuild 빌드 에러 시 빨간색으로 에러 메시지 표시
- React 런타임 에러 시 콘솔에 표시

---

## 현재 UI의 문제점/제한사항

### 1. 파일 전환 UI 없음
- 3개 파일이 존재하지만 전환할 방법이 없음
- 사용자는 항상 app.tsx만 편집 가능

### 2. 파일 추가/삭제 기능 없음
- 기본 3개 파일만 사용 가능
- 새 컴포넌트 파일을 추가할 수 없음

### 3. 패키지 목록 표시 없음
- 어떤 패키지 타입이 로드되었는지 확인 불가
- 로딩 상태 표시 없음

### 4. 에러 피드백 부족
- 타입 추가 실패 시 사용자에게 알림 없음
- `X-Typescript-Types` 헤더가 없으면 조용히 실패

### 5. 빌드 상태 표시 없음
- Preview가 빌드 중인지 완료됐는지 알 수 없음
- 에러 발생 시 iframe 내부에만 표시

---

## 데이터 흐름 요약

```
┌──────────────────────────────────────────────────────────────┐
│                     User Interaction                         │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                   React Components                           │
│  Editor  ←→  MobX Store (editorStore)  ←→  Preview          │
│              ↕                                               │
│         EditorForm                                           │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│               Monaco Editor + Worker                         │
│  Monaco Instance  ←→  CustomTSWorker (worker.ts)            │
│  - Models                - fileEntries Map                   │
│  - Language Service      - urlEntries Map                    │
│                          - resolveModuleNames()              │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                  Preview Execution                           │
│  iframe with:                                                │
│  - esbuild-wasm (bundler)                                    │
│  - Tailwind CSS runtime                                      │
│  - Import map (esm.sh CDN)                                   │
│  - React runtime                                             │
└──────────────────────────────────────────────────────────────┘
```

## 핵심 기술 스택

- **monaco-editor 0.52.2** - 코드 에디터
- **typescript 5.7.3** - 언어 서비스 (worker에서 사용)
- **mobx 6.13.7** - 상태 관리
- **react 19.0.0** - UI 프레임워크
- **esbuild-wasm** - 브라우저 번들러 (esm.sh에서 로드)
- **@tailwindcss/vite 4.1.1** - CSS 프레임워크

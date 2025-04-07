# 🌟 Tailwind Playground

react, tailwindcss 코드를 테스트해볼 수 있는 playground입니다

현재 개발 5일차로, 신속한 프로토타이핑과 기술 검증을 우선적으로 고려하여

- 내가 구현하고 싶은 기능이 현실적인 여건 상 구현이 가능할지를 빠르게 판단하고
- 만약 안된다면, 어떤 다른 방법으로 구현해볼 수 있을지

에 초점을 맞추어 개발하고 있습니다

[배포 링크](https://tailwind-playground-iota.vercel.app/)

---

## 📦 패키지 추가 방법

- 패키지는 **[esm.sh](https://esm.sh)**를 통해 추가할 수 있습니다
- 만약 리액트 기반 라이브러리 사용 과정에서 에러가 발생한다면, **esm.sh 경로에 `?external=react`를 추가**해보는 것을 추천드립니다
  - 예시: `https://esm.sh/@radix-ui/react-dialog?external=react`

---

## 🚧 현재 작업 중인 기능

**단일 파일 → 다중 파일 지원**을 구현 중입니다

- 에디터/프리뷰 기능은 정상 동작하지만, 기존에 구현한 타입 지원 기능이 동작하고 있지 않습니다. **타입 에러**가 발생할 수 있습니다

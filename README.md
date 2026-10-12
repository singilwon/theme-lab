
# Theme Lab

React와 TypeScript를 활용해 세 가지 다크모드 구현 방식을
직접 적용하고 비교하기 위한 개인 학습 프로젝트입니다.

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- styled-components

## 구현 방식

### 1. CSS Variables

CSS 변수와 data-theme 속성을 활용한 다크모드

- CSS Custom Properties 기반 색상 관리
- React 상태에 따른 data-theme 변경
- 콘텐츠 관리 대시보드 구현

### 2. Tailwind CSS

Tailwind의 dark: 유틸리티를 활용한 다크모드

- dark 클래스를 이용한 테마 전환
- 조건부 유틸리티 스타일 적용
- 할 일 관리 및 완료율 표시

### 3. ThemeProvider

styled-components의 ThemeProvider 기반 다크모드

- 라이트·다크 테마 객체 정의
- Provider를 통한 테마 전달
- 프로필 및 환경설정 페이지 구현

## 공통 기능

- useTheme 커스텀 훅을 통한 테마 상태관리
- localStorage 기반 테마 설정 유지
- 초기 접속 시 시스템 테마 설정 반영
- 페이지별 독립적인 테마 관리
- 기본적인 반응형 레이아웃

## 실행 방법

npm install

npm run dev

## 구현 방식 비교

| 방식 | 스타일 관리 | 테마 적용 |
|------|-------------|-----------|
| CSS Variables | CSS 변수 | data-theme |
| Tailwind CSS | 유틸리티 클래스 | dark: |
| ThemeProvider | TypeScript 테마 객체 | Provider |

## 학습 내용

세 가지 다크모드 구현 방식을 직접 적용하면서
테마 상태관리와 스타일 관리 방식의 차이를 학습했습니다.

또한 공통 테마 로직을 커스텀 훅으로 분리하고,
페이지별 스타일 적용 범위를 구분했습니다.
```

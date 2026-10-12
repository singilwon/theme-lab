
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

이 정도면 충분해.

특히 GitHub README에서는 실제 구현한 내용을 중심으로 정리하고, 세 가지 방식의 비교와 학습 목적이 드러나도록 하는 게 좋아.

## 4. Vercel 배포하기

GitHub에 올린 프로젝트를 Vercel에 연결하면 돼.

<box gap={2}>
  <row align="center" gap={3}>
    <AsyncImage query="Vercel black triangle logo white background" aspectRatio="1:1" maxWidth="66px"/>
    <box flex="1" gap={1}>
      **<Link url="https://vercel.com/new" title="Vercel 프로젝트 생성"/>**
      <text color="secondary" size="sm">GitHub 저장소를 연결해 배포</text>
    </box>
  </row>
</box>

진행 순서는 간단해.

1. Vercel에 GitHub 계정으로 로그인
2. **Add New → Project** 선택
3. `theme-lab` 저장소 Import
4. Framework Preset이 `Vite`인지 확인
5. Build Command `npm run build`, Output Directory `dist` 확인
6. Deploy 클릭

React Router를 사용하고 있으므로 배포 후 `/css-variables` 같은 주소에 직접 접속하거나 새로고침했을 때 404가 발생하는지도 확인해야 해.

그 문제가 발생하면 프로젝트 루트에 `vercel.json`을 만들고 다음 설정을 추가하면 돼.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

이 설정은 클라이언트 라우팅 경로를 React 앱의 `index.html`로 연결하는 용도야.

## 5. 마지막 GitHub 커밋

README 수정과 최종 점검이 완료되면 다음과 같이 커밋하자.

```bash
git add .
git commit -m "docs: Theme Lab 프로젝트 설명 및 구현 방식 정리"
git push
```

배포까지 완료되면 README 상단에 실제 배포 URL을 추가해 주면 좋아.

---

### 이후에는?

내 생각에는 여기서 Theme Lab 프로젝트를 마무리하는 게 적절해.

현재 세 가지 방식의 다크모드를 직접 구현했고, React 상태관리, 커스텀 훅, CSS 변수, Tailwind, ThemeProvider까지 경험했으니까.

토기 지원용 포트폴리오에 반영할지는 나중에 기존 포트폴리오와 함께 검토하면 돼. 작은 학습 프로젝트이니 대규모 프로젝트처럼 포장하기보다는 실습한 기술과 배운 점을 간결하게 소개하는 편이 적절해.

**우선 `npm run build`와 `npm run preview`로 최종 확인을 해보자.** 그다음 README를 교체하고 Vercel에 배포하면 Theme Lab은 완성이야.

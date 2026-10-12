import { Link } from "react-router";

const experiments = [
  {
    title: "CSS Variables",
    description: "CSS 변수와 React 상태를 활용한 다크모드",
    path: "/css-variables",
    feature: "콘텐츠 관리",
  },
  {
    title: "Tailwind CSS",
    description: "Tailwind의 dark: 클래스를 활용한 다크모드",
    path: "/tailwind",
    feature: "할 일 관리",
  },
  {
    title: "ThemeProvider",
    description: "테마 객체와 Provider를 활용한 다크모드",
    path: "/theme-provider",
    feature: "프로필 및 환경설정",
  },
];

function HomePage() {
  return (
    <main className="lab-home">
      <section className="lab-hero">
        <p>FRONTEND ENGINEERING PLAYGROUND</p>
        <h1>
          One Interface.
          <br />
          Three Ways to Theme.
        </h1>
        <p>
          세 가지 다크모드 구현 방식을 직접 경험하고 비교하는 프론트엔드
          실험실입니다.
        </p>
      </section>

      <section className="lab-comparison">
        <span className="lab-kicker">COMPARISON</span>
        <h2>Implementation Comparison</h2>
        <p>세 가지 다크모드 구현 방식의 차이를 비교합니다.</p>

        <div className="lab-comparison-list">
          <div className="lab-comparison-item">
            <div>
              <h3>CSS Variables</h3>
              <p>CSS 변수와 data-theme을 활용한 테마 전환</p>
            </div>
            <code>data-theme</code>
          </div>

          <div className="lab-comparison-item">
            <div>
              <h3>Tailwind CSS</h3>
              <p>dark: 유틸리티를 활용한 조건부 스타일 적용</p>
            </div>
            <code>dark:</code>
          </div>

          <div className="lab-comparison-item">
            <div>
              <h3>ThemeProvider</h3>
              <p>테마 객체를 전달하여 컴포넌트 스타일 변경</p>
            </div>
            <code>theme object</code>
          </div>
        </div>
      </section>

      <section className="experiments">
        <h2>Experiments</h2>

        <div className="experiment-grid">
          {experiments.map((item, index) => (
            <Link key={item.path} to={item.path} className="experiment-card">
              <span>EXPERIMENT 0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.feature}</strong>
              <div className="card-link">살펴보기 →</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;

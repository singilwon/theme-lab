import { Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import CssVariablesPage from "./pages/CssVariablesPage";
import "./App.css";

function ComingSoon({ title }: { title: string }) {
  return (
    <main className="coming-soon">
      <h1>{title}</h1>
      <p>현재 준비 중인 페이지입니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </main>
  );
}

function App() {
  return (
    <>
      <header className="lab-header">
        <Link to="/">Theme Lab</Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/css-variables">CSS Variables</Link>
          <Link to="/tailwind">Tailwind</Link>
          <Link to="/theme-provider">ThemeProvider</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/css-variables" element={<CssVariablesPage />} />
        <Route path="/tailwind" element={<ComingSoon title="Tailwind CSS" />} />
        <Route
          path="/theme-provider"
          element={<ComingSoon title="ThemeProvider" />}
        />
      </Routes>
    </>
  );
}

export default App;

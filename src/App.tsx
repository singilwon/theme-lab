import { Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import CssVariablesPage from "./pages/CssVariablesPage";
import TailwindPage from "./pages/TailwindPage";
import ThemeProviderPage from "./pages/ThemeProviderPage";
import "./App.css";

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
        <Route path="/tailwind" element={<TailwindPage />} />
        <Route path="/theme-provider" element={<ThemeProviderPage />} />
      </Routes>
    </>
  );
}

export default App;

import { useEffect, useState, type FormEvent } from "react";
import { useTheme } from "../hooks/useTheme";
import "./CssVariablesPage.css";

type Filter = "all" | "published" | "draft";

type ContentItem = {
  id: string;
  title: string;
  published: boolean;
};

const initialContents: ContentItem[] = [
  { id: "1", title: "프로젝트 회고 정리", published: true },
  { id: "2", title: "React 상태관리 학습", published: false },
];

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "published", label: "공개" },
  { value: "draft", label: "임시저장" },
];

function CssVariablesPage() {
  const { theme, toggleTheme } = useTheme("content-theme");

  const [contents, setContents] = useState<ContentItem[]>(() => {
    try {
      const saved = localStorage.getItem("content-items");
      if (!saved) return initialContents;

      const parsed: unknown = JSON.parse(saved);

      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.published === "boolean",
        )
      ) {
        return parsed;
      }
    } catch {
      // 저장된 데이터가 잘못됐다면 초기 데이터 사용
    }

    return initialContents;
  });

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("content-items", JSON.stringify(contents));
  }, [contents]);

  const addContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newContent: ContentItem = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      published: false,
    };

    setContents((prev) => [newContent, ...prev]);
    setTitle("");
  };

  const togglePublished = (id: string) => {
    setContents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item,
      ),
    );
  };

  const deleteContent = (id: string) => {
    setContents((prev) => prev.filter((item) => item.id !== id));
  };

  const publishedCount = contents.filter((item) => item.published).length;

  const filteredContents = contents.filter((item) => {
    if (filter === "published") return item.published;
    if (filter === "draft") return !item.published;
    return true;
  });

  return (
    <div className="css-variables-page" data-theme={theme}>
      <header className="header">
        <strong className="brand">Content Studio</strong>

        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "☀️ 라이트모드" : "🌙 다크모드"}
        </button>
      </header>

      <main className="container">
        <div className="intro">
          <h1>콘텐츠 관리</h1>
          <p>게시물을 작성하고 공개 상태를 관리하세요.</p>
        </div>

        <section className="stats">
          <div className="stat-card">
            <span>전체</span>
            <strong>{contents.length}</strong>
          </div>

          <div className="stat-card">
            <span>공개</span>
            <strong>{publishedCount}</strong>
          </div>

          <div className="stat-card">
            <span>임시저장</span>
            <strong>{contents.length - publishedCount}</strong>
          </div>
        </section>

        <section className="panel">
          <h2>새 콘텐츠 등록</h2>

          <form className="add-form" onSubmit={addContent}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="콘텐츠 제목을 입력하세요"
              aria-label="콘텐츠 제목"
              maxLength={60}
              required
            />
            <button className="primary-button" type="submit">
              등록
            </button>
          </form>
        </section>

        <section className="panel">
          <div className="list-heading">
            <h2>콘텐츠 목록</h2>
            <div className="filters">
              {filters.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    filter === option.value ? "filter active" : "filter"
                  }
                  onClick={() => setFilter(option.value)}
                  aria-pressed={filter === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="content-list">
            {filteredContents.map((item) => (
              <li key={item.id} className="content-item">
                <div className="item-info">
                  <strong>{item.title}</strong>
                  <span
                    className={item.published ? "status published" : "status"}
                  >
                    {item.published ? "공개" : "임시저장"}
                  </span>
                </div>

                <div className="item-actions">
                  <button
                    type="button"
                    onClick={() => togglePublished(item.id)}
                  >
                    {item.published ? "비공개" : "공개하기"}
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteContent(item.id)}
                    aria-label={`${item.title} 삭제`}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {filteredContents.length === 0 && (
            <p className="empty">표시할 콘텐츠가 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default CssVariablesPage;

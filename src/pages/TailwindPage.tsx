import { useEffect, useState, type FormEvent } from "react";
import { useTheme } from "../hooks/useTheme";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskFilter = "all" | "active" | "completed";

const initialTasks: Task[] = [
  { id: "1", title: "React 코드 리팩토링", completed: true },
  { id: "2", title: "Tailwind 다크모드 구현", completed: false },
  { id: "3", title: "GitHub 커밋하기", completed: false },
];

const filters: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

function TailwindPage() {
  const { theme, toggleTheme } = useTheme("tailwind-theme");

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("tailwind-tasks");
      if (!saved) return initialTasks;

      const parsed: unknown = JSON.parse(saved);

      if (
        Array.isArray(parsed) &&
        parsed.every(
          (task) =>
            task !== null &&
            typeof task === "object" &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.completed === "boolean",
        )
      ) {
        return parsed;
      }
    } catch {
      // 저장된 데이터에 문제가 있다면 초기 데이터 사용
    }

    return initialTasks;
  });

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    localStorage.setItem("tailwind-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      className={`tailwind-page ${
        theme === "dark" ? "dark" : ""
      } min-h-screen bg-slate-50 text-slate-900
         dark:bg-slate-950 dark:text-slate-100
         transition-colors duration-200`}
    >
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* 페이지 헤더 */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
              EXPERIMENT 02
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Task Board
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tailwind CSS로 만드는 할 일 관리 페이지
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            className="rounded-xl border border-slate-200
              bg-white px-4 py-3 text-sm font-medium
              shadow-sm transition-colors hover:bg-slate-100
              dark:border-slate-700 dark:bg-slate-800
              dark:hover:bg-slate-700"
          >
            {theme === "dark" ? "☀️ 라이트모드" : "🌙 다크모드"}
          </button>
        </header>

        {/* 진행률 */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">오늘의 진행률</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {tasks.length}개 중 {completedCount}개 완료
              </p>
            </div>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="할 일 완료율"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-indigo-500 transition-all duration-300"
            />
          </div>
        </section>

        {/* 할 일 입력 */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-semibold">새 할 일 추가</h2>

          <form onSubmit={addTask} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="새로운 할 일을 입력하세요"
              aria-label="새로운 할 일"
              maxLength={80}
              required
              className="min-w-0 flex-1 rounded-xl border border-slate-200
                bg-slate-50 px-4 py-3 text-sm text-slate-900
                placeholder:text-slate-400
                focus:border-indigo-500 focus:outline-none
                dark:border-slate-700 dark:bg-slate-800
                dark:text-white dark:placeholder:text-slate-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3
                text-sm font-semibold text-white
                transition-colors hover:bg-indigo-700"
            >
              추가하기
            </button>
          </form>
        </section>

        {/* 할 일 목록 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">할 일 목록</h2>

            <div className="flex flex-wrap gap-2">
              {filters.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={filter === option.value}
                  className={
                    filter === option.value
                      ? "rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white"
                      : "rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 shrink-0 accent-indigo-600"
                  />

                  <span
                    className={
                      task.completed
                        ? "min-w-0 break-words text-sm text-slate-400 line-through"
                        : "min-w-0 break-words text-sm font-medium"
                    }
                  >
                    {task.title}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`${task.title} 삭제`}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>

          {filteredTasks.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
              표시할 할 일이 없습니다.
            </p>
          )}
        </section>

        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          Built with React · TypeScript · Tailwind CSS v4
        </p>
      </main>
    </div>
  );
}

export default TailwindPage;

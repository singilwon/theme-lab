export type AppTheme = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
};

export const lightTheme: AppTheme = {
  background: "#f5f6fa",
  surface: "#ffffff",
  text: "#111827",
  muted: "#64748b",
  border: "#e2e8f0",
  primary: "#4f46e5",
};

export const darkTheme: AppTheme = {
  background: "#121826",
  surface: "#1e293b",
  text: "#f8fafc",
  muted: "#94a3b8",
  border: "#334155",
  primary: "#818cf8",
};

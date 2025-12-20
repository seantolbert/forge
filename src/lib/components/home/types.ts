export type SummaryData = {
  eyebrow?: string;
  headline?: string;
  summary: string;
};

export type Recommendation = {
  title: string;
  type: string;
  length: string;
  focus: string;
  accent: string;
};

export type Task = {
  title: string;
  status?: "ready" | "blocked" | "in-progress";
  due?: string;
};

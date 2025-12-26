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
  id: string;
  title: string;
  status?: "todo" | "blocked" | "done";
  due?: string;
  done?: boolean;
};

export type Project = {
  id: string;
  name: string;
  summary?: string | null;
  status?: string | null;
  created_at?: string;
  due_at?: string | null;
};

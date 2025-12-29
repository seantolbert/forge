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
  dueAt?: string | null;
  done?: boolean;
  notes?: string | null;
  url?: string | null;
  frequency?: string | null;
  notify?: boolean | null;
  createEvent?: boolean | null;
  projectId?: string | null;
  projectColor?: string | null;
  linkedOrders?: string | null;
};

export type Project = {
  id: string;
  name: string;
  summary?: string | null;
  status?: string | null;
  created_at?: string;
  due_at?: string | null;
  color?: string | null;
};

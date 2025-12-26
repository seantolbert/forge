import { writable } from "svelte/store";
import type { Task } from "$lib/components/home/types";
import { supabase } from "$lib/supabaseClient";

export const tasksStore = writable<Task[]>([]);

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDueLabel = (iso: string) => {
  const date = new Date(iso);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (sameDay(date, today)) return "Today";
  if (sameDay(date, tomorrow)) return "Tomorrow";
  return date.toLocaleDateString("default", { month: "short", day: "numeric" });
};

const mapRowToTask = (row: any): Task => ({
  id: row.id,
  title: row.title,
  status: row.status ?? "todo",
  due: row.due_at ? formatDueLabel(row.due_at) : undefined,
  done: row.status === "done"
});

export const loadTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load tasks", error);
    return { error };
  }
  tasksStore.set(data.map(mapRowToTask));
  return { data };
};

export const markDone = async (id: string) => {
  const { error } = await supabase
    .from("tasks")
    .update({ status: "done" })
    .eq("id", id);
  if (error) {
    console.error("Failed to mark done", error);
    return;
  }
  tasksStore.update((list) =>
    list.map((t) => (t.id === id ? { ...t, status: "done", done: true } : t))
  );
};

export const pushToTomorrow = async (id: string) => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  const { error } = await supabase
    .from("tasks")
    .update({ due_at: newDate.toISOString() })
    .eq("id", id);
  if (error) {
    console.error("Failed to push task", error);
    return;
  }
  tasksStore.update((list) =>
    list.map((t) => (t.id === id ? { ...t, due: "Tomorrow" } : t))
  );
};

export const removeTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete task", error);
    return;
  }
  tasksStore.update((list) => list.filter((t) => t.id !== id));
};

export const nudgeTask = (id: string, direction: "up" | "down") => {
  tasksStore.update((list) => {
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return list;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return list;
    const next = [...list];
    const [moved] = next.splice(idx, 1);
    next.splice(targetIdx, 0, moved);
    return next;
  });
};

import { writable } from "svelte/store";
import type { Task } from "$lib/components/home/types";

const STORAGE_KEY = "tasks";
const isBrowser = typeof localStorage !== "undefined";

const load = (): Task[] => {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
};

export const tasksStore = writable<Task[]>(load());

const persist = (value: Task[]) => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

tasksStore.subscribe((value) => persist(value));

export const initTasks = (defaults: Task[]) => {
  tasksStore.update((current) => {
    if (current.length) return current;
    persist(defaults);
    return defaults;
  });
};

const nextId = () => `t-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const addTask = (title: string) => {
  if (!title.trim()) return;
  const newTask: Task = {
    id: nextId(),
    title: title.trim(),
    status: "ready",
    due: "Today",
    done: false
  };
  tasksStore.update((list) => [newTask, ...list]);
};

export const markDone = (id: string) => {
  tasksStore.update((list) => list.map((t) => (t.id === id ? { ...t, done: true } : t)));
};

export const pushToTomorrow = (id: string) => {
  tasksStore.update((list) => list.map((t) => (t.id === id ? { ...t, due: "Tomorrow" } : t)));
};

export const removeTask = (id: string) => {
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

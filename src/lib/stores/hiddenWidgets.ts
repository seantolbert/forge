import { writable } from "svelte/store";

const STORAGE_KEY = "hiddenWidgets";
const defaultHidden = ["settings"];

const load = () => {
  if (typeof localStorage === "undefined") return defaultHidden;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultHidden;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultHidden;
  } catch (_e) {
    return defaultHidden;
  }
};

export const hiddenWidgets = writable<string[]>(load());

hiddenWidgets.subscribe((value) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});

export const hideWidget = (id: string) =>
  hiddenWidgets.update((list) => (list.includes(id) ? list : [...list, id]));

export const unhideWidget = (id: string) =>
  hiddenWidgets.update((list) => list.filter((item) => item !== id));

import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

const STORAGE_KEY = "hiddenWidgets";
const defaultHidden = ["settings"];
const PREFS_ID = "global";

const loadLocal = () => {
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

export const hiddenWidgets = writable<string[]>(defaultHidden);
let ready = false;

export const initHiddenWidgets = async () => {
  // Try Supabase first
  const { data, error } = await supabase
    .from("widget_settings")
    .select("hidden")
    .eq("id", PREFS_ID)
    .single();

  if (!error && data?.hidden) {
    hiddenWidgets.set(data.hidden);
    ready = true;
    persistLocal(data.hidden);
    return;
  }

  // If no row exists, seed it with defaults
  if (error && error.code === "PGRST116") {
    const { data: inserted, error: insertError } = await supabase
      .from("widget_settings")
      .insert({ id: PREFS_ID, hidden: defaultHidden })
      .select("hidden")
      .single();
    if (!insertError && inserted?.hidden) {
      hiddenWidgets.set(inserted.hidden);
      ready = true;
      persistLocal(inserted.hidden);
      return;
    }
  }

  // Fallback to local
  const local = loadLocal();
  hiddenWidgets.set(local);
  ready = true;
};

const persistLocal = (value: string[]) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const persistRemote = async (value: string[]) => {
  await supabase.from("widget_settings").upsert({
    id: PREFS_ID,
    hidden: value,
    updated_at: new Date().toISOString()
  });
};

hiddenWidgets.subscribe((value) => {
  if (!ready) return;
  persistLocal(value);
  persistRemote(value).catch((error) => console.error("Failed to persist widget prefs", error));
});

export const hideWidget = (id: string) =>
  hiddenWidgets.update((list) => (list.includes(id) ? list : [...list, id]));

export const unhideWidget = (id: string) =>
  hiddenWidgets.update((list) => list.filter((item) => item !== id));

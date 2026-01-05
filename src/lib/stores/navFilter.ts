import { writable } from "svelte/store";

export type NavFilter = "all" | "daily" | "weekly" | "monthly" | "projects";

export const navFilter = writable<NavFilter>("all");

import { writable } from "svelte/store";

export type NavFilter = "home" | "orders" | "calendar" | "tasks" | "settings" | "recommendations" | "summary";

export const navFilter = writable<NavFilter | null>(null);

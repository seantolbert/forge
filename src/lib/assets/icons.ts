import { navIcons } from "./nav-icons";

// Re-export navigation icons for compatibility.
export const icons = navIcons;
export type IconName = keyof typeof icons;

// Helper to fetch an icon string; returns undefined if missing.
export const getIcon = (name: IconName) => icons[name];

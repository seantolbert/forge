// Minimal navigation icons for task filters.
export const navIcons = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" aria-hidden="true">
  <path d="M4 14.5 16 5l12 9.5V27a2 2 0 0 1-2 2h-6.5v-8.5h-7V29H6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12.5 29V18.5h7V29" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>`,
  daily: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" aria-hidden="true">
  <rect x="4" y="4" width="24" height="24" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
  <text x="16" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="currentColor">D</text>
</svg>`,
  weekly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" aria-hidden="true">
  <rect x="4" y="4" width="24" height="24" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
  <text x="16" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="currentColor">W</text>
</svg>`,
  monthly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" aria-hidden="true">
  <rect x="4" y="4" width="24" height="24" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
  <text x="16" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="currentColor">M</text>
</svg>`,
  projects: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" aria-hidden="true">
  <path d="M4 26 16 6l12 20H4z" fill="currentColor" />
</svg>`,
} as const;

export type NavIconName = keyof typeof navIcons;

export const getNavIcon = (name: NavIconName) => navIcons[name];

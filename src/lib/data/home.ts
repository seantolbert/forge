import type { OrderItem } from "$lib/components/home/OrdersList.svelte";
import type { Recommendation, SummaryData } from "$lib/components/home/types";

export const CARD_IDS = {
  summary: "summary",
  tasks: "tasks",
  recommendations: "recommendations",
  calendar: "calendar",
  orders: "orders",
  settings: "settings",
} as const;

export type CardId = (typeof CARD_IDS)[keyof typeof CARD_IDS];

export const defaultCardOrder: CardId[] = [
  CARD_IDS.summary,
  CARD_IDS.tasks,
  CARD_IDS.recommendations,
  CARD_IDS.calendar,
  CARD_IDS.orders,
  CARD_IDS.settings,
];

export const cardLabels: Record<CardId, string> = {
  [CARD_IDS.summary]: "Summary",
  [CARD_IDS.tasks]: "Tasks",
  [CARD_IDS.recommendations]: "Recommendations",
  [CARD_IDS.calendar]: "Calendar",
  [CARD_IDS.orders]: "Orders",
  [CARD_IDS.settings]: "Settings",
};

export const widgetList = defaultCardOrder.map((id) => ({ id, label: cardLabels[id] }));

const pad = (value: number) => String(value).padStart(2, "0");

const todayDate = new Date();
const currentYear = todayDate.getFullYear();
const currentMonth = todayDate.getMonth();
const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const toDateKey = (day: number) =>
  `${currentYear}-${pad(currentMonth + 1)}-${pad(Math.min(Math.max(day, 1), daysInCurrentMonth))}`;

const dateIso = (dayOffset: number) =>
  new Date(currentYear, currentMonth, todayDate.getDate() + dayOffset).toISOString();

export const todayKey = `${currentYear}-${pad(currentMonth + 1)}-${pad(todayDate.getDate())}`;

export type CalendarEvent = { date: string; label: string };

export const calendarEvents: CalendarEvent[] = [
  { date: toDateKey(todayDate.getDate()), label: "Today" },
  { date: toDateKey(todayDate.getDate()), label: "Budget review" },
  { date: toDateKey(todayDate.getDate()), label: "Ops sync" },
  { date: toDateKey(todayDate.getDate()), label: "UX handoff" },
  { date: toDateKey(todayDate.getDate()), label: "Client check-in" },
  { date: toDateKey(todayDate.getDate()), label: "Marketing retro" },
  { date: toDateKey(todayDate.getDate() + 2), label: "Workshop" },
  { date: toDateKey(todayDate.getDate() + 5), label: "Demo" },
  { date: toDateKey(8), label: "Ops review" },
  { date: toDateKey(15), label: "Release" },
];

export const summary: SummaryData = {
  eyebrow: "Today",
  headline: "Your day is already 62% lighter",
  summary:
    "Meetings trimmed, focus blocks secured. You have space for deep work and a quick recharge. Take a short reset at 14:00-14:30 to keep momentum clean.",
};

export const recommendations: Recommendation[] = [
  {
    title: "Signal Drift",
    type: "Podcast",
    length: "24 min",
    focus: "Clarity",
    accent: "var(--accent-amber)",
  },
  {
    title: "The Quiet Sprint",
    type: "Book",
    length: "3h read",
    focus: "Flow",
    accent: "var(--accent-ice)",
  },
  {
    title: "North Star Notes",
    type: "Podcast",
    length: "32 min",
    focus: "Strategy",
    accent: "var(--accent-rose)",
  },
  {
    title: "Daymaker Playbook",
    type: "Book",
    length: "2h read",
    focus: "Energy",
    accent: "var(--accent-mint)",
  },
];

export const orders: OrderItem[] = [
  {
    id: "o-1",
    title: "Handcrafted mug",
    note: "Buyer asked for gift wrap",
    source: "Etsy",
    createdAt: dateIso(-1),
    stage: "processing",
    image: "https://images.unsplash.com/photo-1523419400521-211b4c577c17?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "o-2",
    title: "Vintage camera strap",
    note: "Ship with tracking",
    source: "eBay",
    createdAt: dateIso(-3),
    stage: "shipped",
  },
  {
    id: "o-3",
    title: "Accent lamp",
    note: "Local pickup",
    source: "Facebook Marketplace",
    createdAt: dateIso(-7),
    stage: "packed",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "o-4",
    title: "Custom poster",
    note: "Awaiting payment confirmation",
    source: "Shopify",
    createdAt: dateIso(0),
    stage: "new",
  },
];

export const homeDate = {
  todayDate,
  currentYear,
  currentMonth,
  daysInCurrentMonth,
  toDateKey,
};

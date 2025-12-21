<script lang="ts">
  import { onMount } from "svelte";
  import TaskItem from "./TaskItem.svelte";
  import type { Task } from "./types";

  export let tasks: Task[] = [];
  export let limit: number | null = null;

  const STORAGE_KEY = "tasks";
  let items: Task[] = [];
  let mounted = false;
  let displayItems: Task[] = [];

  onMount(() => {
    mounted = true;
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    items = saved ? (JSON.parse(saved) as Task[]) : tasks;
    persist();
  });

  const persist = () => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  $: displayItems = limit ? items.slice(0, limit) : items;

  const markDone = (id: string) => {
    items = items.map((t) => (t.id === id ? { ...t, done: true } : t));
    persist();
  };

  const pushTomorrow = (id: string) => {
    items = items.map((t) => (t.id === id ? { ...t, due: "Tomorrow" } : t));
    persist();
  };

  const removeTask = (id: string) => {
    items = items.filter((t) => t.id !== id);
    persist();
  };

  const nudge = (id: string, direction: "up" | "down") => {
    const idx = items.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(idx, 1);
    next.splice(targetIdx, 0, moved);
    items = next;
    persist();
  };
</script>

<section class="task-list">
  <header class="task-head">
    <h2 class="eyebrow">Tasks</h2>
    <span class="count">{items.length}</span>
  </header>

  <div class="tasks">
    {#each displayItems as task (task.id)}
      <TaskItem
        {task}
        on:done={(e) => markDone(e.detail.id)}
        on:push={(e) => pushTomorrow(e.detail.id)}
        on:delete={(e) => removeTask(e.detail.id)}
        on:nudgeup={(e) => nudge(e.detail.id, "up")}
        on:nudgedown={(e) => nudge(e.detail.id, "down")}
      />
    {/each}
  </div>
</section>

<style>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .task-head {
    display: flex;
    align-items: center;
  }

  h2 {
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .count {
    min-width: 2.2rem;
    text-align: center;
    padding: 0.35rem 0.5rem;
    border-radius: 999px;
    font-weight: 700;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import TaskItem from "./TaskItem.svelte";
  import type { Task } from "./types";
  import {
    tasksStore,
    markDone,
    pushToTomorrow,
    removeTask,
    nudgeTask,
    loadTasks
  } from "$lib/stores/tasks";

  export let limit: number | null = null;

  let displayItems: Task[] = [];
  let loadError = "";

  onMount(async () => {
    const { error } = await loadTasks();
    if (error) {
      loadError = "Unable to load tasks right now.";
    }
  });

  $: displayItems = limit ? $tasksStore.slice(0, limit) : $tasksStore;
</script>

<section class="task-list">
  <header class="task-head">
    <h2 class="eyebrow">Tasks</h2>
    <span class="count">{$tasksStore.length}</span>
  </header>

  {#if loadError}
    <p class="error">{loadError}</p>
  {/if}

  <div class="tasks">
    {#each displayItems as task (task.id)}
      <TaskItem
        {task}
        on:done={(e) => markDone(e.detail.id)}
        on:push={(e) => pushToTomorrow(e.detail.id)}
        on:delete={(e) => removeTask(e.detail.id)}
        on:nudgeup={(e) => nudgeTask(e.detail.id, "up")}
        on:nudgedown={(e) => nudgeTask(e.detail.id, "down")}
      />
    {/each}
  </div>
</section>

<style>
  .task-list {
    display: flex;
    flex-direction: column;
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

  .error {
    margin: 0.25rem 0 0.35rem;
    color: #ff90c2;
    font-weight: 700;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
</style>

<script lang="ts">
  import type { Task } from "./types";

  export let tasks: Task[] = [];
</script>

<section class="task-list">
  <header class="task-head">
    <div>
      <p class="eyebrow">Today</p>
      <h2>Quick tasks</h2>
    </div>
    <span class="count">{tasks.length}</span>
  </header>

  <div class="tasks">
    {#each tasks as task}
      <article class="task">
        <div class="status {task.status ?? 'ready'}"></div>
        <div class="task-body">
          <p class="title">{task.title}</p>
          {#if task.due}
            <p class="meta">Due {task.due}</p>
          {/if}
        </div>
        <button class="soft-button tiny">Open</button>
      </article>
    {/each}
  </div>
</section>

<style>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .task-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    margin: 0.15rem 0 0;
    font-size: 1.1rem;
  }

  .count {
    min-width: 2.2rem;
    text-align: center;
    padding: 0.35rem 0.5rem;
    border-radius: 999px;
    /* border: 1px solid rgba(255, 255, 255, 0.14); */
    /* background: rgba(255, 255, 255, 0.06); */
    font-weight: 700;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .task {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.65rem;
    align-items: center;
    padding: 0.7rem;
    border-radius: 16px;
    /* background: rgba(255, 255, 255, 0.06); */
    /* border: 1px solid rgba(255, 255, 255, 0.1); */
  }

  .status {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(120deg, #b6ffda, #5ee2a0);
    box-shadow: 0 0 0 6px rgba(94, 226, 160, 0.12);
  }

  .status.in-progress {
    background: linear-gradient(120deg, #b9d5ff, #6fc8ff);
    box-shadow: 0 0 0 6px rgba(111, 200, 255, 0.12);
  }

  .status.blocked {
    background: linear-gradient(120deg, #ff90c2, #ff5e8a);
    box-shadow: 0 0 0 6px rgba(255, 144, 194, 0.12);
  }

  .task-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .title {
    margin: 0;
    font-weight: 700;
  }

  .meta {
    margin: 0;
    color: var(--text-dim);
    font-size: 0.9rem;
  }
</style>

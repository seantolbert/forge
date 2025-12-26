<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "./types";

  export let task: Task;

  const dispatch = createEventDispatcher();

  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let active = false;

  const RESET_DELAY = 160;

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    active = true;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!active) return;
    const touch = event.touches[0];
    translateX = touch.clientX - startX;
  };

  const resetPosition = () => {
    setTimeout(() => {
      translateX = 0;
      active = false;
    }, RESET_DELAY);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (!active) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Horizontal gestures first
    if (absX > absY) {
      if (dx > 80) {
        dispatch("done", { id: task.id });
      } else if (dx < -140) {
        dispatch("delete", { id: task.id });
      } else if (dx < -60) {
        dispatch("push", { id: task.id });
      }
      resetPosition();
      return;
    }

    // Vertical nudge up/down
    if (dy < -40) {
      dispatch("nudgeup", { id: task.id });
    } else if (dy > 40) {
      dispatch("nudgedown", { id: task.id });
    }

    resetPosition();
  };
</script>

<article
  class={`task ${task.done ? "done" : ""} ${task.status ?? "todo"}`}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
  style={`transform: translateX(${translateX}px);`}
>
  <div class="stripe"></div>
  <div class={`checkbox ${task.done ? "checked" : ""}`} aria-hidden="true">
    {#if task.done}
      <span class="check">✓</span>
    {/if}
  </div>
  <div class="task-body">
    <p class="title">{task.title}</p>
    {#if task.due}
      <p class="meta">Due {task.due}</p>
    {/if}
  </div>
  <button class="soft-button tiny" disabled>Open</button>
</article>

<style>
  .task {
    display: grid;
    grid-template-columns: 4px 18px 1fr auto;
    gap: 0.65rem;
    align-items: center;
    padding: 0.55rem 0.35rem;
    border-radius: 12px;
    background: none;
    border: none;
    transition: transform 160ms ease, opacity 160ms ease, background 160ms ease;
  }

  .task.todo .stripe {
    background: linear-gradient(120deg, #b6ffda, #5ee2a0);
  }

  .task.blocked .stripe {
    background: linear-gradient(120deg, #ff90c2, #ff5e8a);
  }

  .task.done .stripe {
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
  }

  .stripe {
    width: 4px;
    height: 100%;
    border-radius: 999px;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    color: #0b1021;
  }

  .checkbox.checked {
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .check {
    font-size: 0.8rem;
    font-weight: 800;
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

  .task.done {
    opacity: 0.4;
  }
</style>

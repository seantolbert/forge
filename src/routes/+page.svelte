<script lang="ts">
  import TaskList from "$lib/components/home/TaskList.svelte";
  import { navFilter } from "$lib/stores/navFilter";
  import "$lib/styles/home.css";
</script>

<main class="home">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>
  <div class="glow glow-c"></div>

  <section class="task-hub glass">
    <header class="task-intro">
      <p class="eyebrow">Today</p>
      <h1>Stay ahead by clearing the queue</h1>
      <p class="lead">Home now centers on the full task list — add, edit, and reorder without distractions.</p>
    </header>

    <TaskList limit={null} filter={$navFilter} />
  </section>
</main>

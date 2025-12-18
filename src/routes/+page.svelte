<script lang="ts">
  import TaskSection from "$lib/components/TaskSection.svelte";
</script>

<main class="page">
  <section class="content">
    <h1>Home</h1>
    <p>This is the home page.</p>
    <TaskSection />
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 40rem;
    width: 100%;
  }
</style>

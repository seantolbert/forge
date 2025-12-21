<script lang="ts">
  import { hiddenWidgets, hideWidget, unhideWidget } from "$lib/stores/hiddenWidgets";

  const WIDGETS = [
    { id: "summary", label: "Summary" },
    { id: "tasks", label: "Tasks" },
    { id: "recommendations", label: "Recommendations" },
    { id: "calendar", label: "Calendar" },
    { id: "orders", label: "Orders" },
    { id: "settings", label: "Settings" }
  ];
</script>

<main class="page">
  <section class="widget">
    <p class="eyebrow">Settings</p>
    <h1>Visibility</h1>
    <p class="lead">Toggle which widgets show on Home.</p>

    {#each WIDGETS as widget}
      <label class="switch-row">
        <span>Show {widget.label}</span>
        <input
          type="checkbox"
          checked={!$hiddenWidgets.includes(widget.id)}
          on:change={(e) => (e.currentTarget.checked ? unhideWidget(widget.id) : hideWidget(widget.id))}
        />
      </label>
    {/each}
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #05060d 0%, #0a0d1a 60%, #06080f 100%);
    color: #e6ecff;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
  }

  .widget {
    width: 100%;
    max-width: 480px;
    padding: 1.4rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .eyebrow {
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.7);
    margin: 0;
    font-size: 0.9rem;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .lead {
    margin: 0 0 0.25rem;
    color: rgba(230, 236, 255, 0.75);
  }

  .switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    gap: 1rem;
  }

  input[type="checkbox"] {
    width: 42px;
    height: 24px;
    accent-color: #9ac8ff;
  }
</style>

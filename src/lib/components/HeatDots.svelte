<script lang="ts">
  let { level = 3 } = $props<{ level?: 1 | 2 | 3 | 4 | 5 }>();
  const dots = Array.from({ length: 5 }, (_, i) => i < level);
</script>

<div class="heat" role="img" aria-label={`Heat level ${level} of 5`}>
  {#each dots as isOn, index}
    <span class={`dot ${isOn ? "on" : ""}`} aria-hidden="true" />
  {/each}
</div>

<style>
  .heat {
    display: inline-flex;
    gap: 4px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .dot.on {
    background: radial-gradient(circle at 30% 30%, #ffdda5, #ff7b45);
    box-shadow: 0 0 6px rgba(255, 123, 69, 0.7);
  }
</style>

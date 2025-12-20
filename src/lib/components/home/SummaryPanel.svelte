<script lang="ts">
  import type { SummaryData } from "./types";

  export let data: SummaryData;
</script>

<div class="summary">
  {#if data.eyebrow}
    <p class="eyebrow">{data.eyebrow}</p>
  {/if}
  {#if data.headline}
    <h1>{data.headline}</h1>
  {/if}
  <p class="subhead">{data.summary}</p>
</div>

<style>
  .summary {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  h1 {
    font-size: 1.8rem;
    line-height: 1.25;
    margin: 0;
  }

  .subhead {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.5;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 2.1rem;
    }
  }
</style>

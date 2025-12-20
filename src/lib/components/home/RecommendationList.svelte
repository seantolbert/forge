<script lang="ts">
  import RecommendationCard from "./RecommendationCard.svelte";
  import type { Recommendation } from "./types";

  export let items: Recommendation[] = [];
</script>

<section class="list">
  <header class="list-head">
    <div>
      <p class="eyebrow">Personal picks</p>
      <h2>Books and podcasts tuned to today</h2>
    </div>
    <button class="soft-button ghost">Refresh</button>
  </header>

  <div class="rail">
    {#each items as rec}
      <RecommendationCard item={rec} />
    {/each}
  </div>
</section>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .list-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .list-head h2 {
    margin: 0.15rem 0 0;
    font-size: 1.1rem;
  }

  .rail {
    --gap: 0.75rem;
    display: flex;
    gap: var(--gap);
    overflow-x: auto;
    padding: 0.1rem 0.25rem 0.25rem 0.1rem;
    scroll-snap-type: x mandatory;
  }

  .rail :global(.rec) {
    flex: 0 0 calc((100% - (var(--gap) * 2)) / 3);
    min-width: 9rem;
  }
</style>

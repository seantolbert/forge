<script lang="ts">
  import type { Recommendation } from "./types";

  export let item: Recommendation;
</script>

<article class="rec" style={`--accent:${item.accent}`}>
  <div class="rec-icon">
    <div class="halo"></div>
    <span>{item.type === "Book" ? "[]" : "()"}</span>
  </div>
  <div class="rec-content">
    <div class="rec-top">
      <span class="type">{item.type}</span>
      <span class="length">{item.length}</span>
    </div>
    <p class="rec-title">{item.title}</p>
    <p class="rec-focus">Built for {item.focus} today.</p>
  </div>
  <button class="soft-button tiny">Play</button>
</article>

<style>
  .rec {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
    align-items: center;
    padding: 0.85rem 0.85rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    scroll-snap-align: start;
  }

  .rec::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: var(--accent);
    mask:
      linear-gradient(#000, #000) content-box,
      linear-gradient(#000, #000);
    -webkit-mask:
      linear-gradient(#000, #000) content-box,
      linear-gradient(#000, #000);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
    pointer-events: none;
    opacity: 0.65;
  }

  .rec-icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    position: relative;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .rec-icon .halo {
    position: absolute;
    inset: -8px;
    background: var(--accent);
    filter: blur(16px);
    opacity: 0.6;
  }

  .rec-icon span {
    position: relative;
    font-weight: 800;
    font-size: 1rem;
    color: #0b1021;
  }

  .rec-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .rec-top {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    color: var(--text-dim);
    font-size: 0.9rem;
  }

  .rec-title {
    margin: 0;
    font-weight: 700;
    font-size: 1rem;
  }

  .rec-focus {
    margin: 0;
    color: var(--text-dim);
  }

  .type {
    font-weight: 700;
  }

  .length {
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }
</style>

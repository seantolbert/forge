<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  export let open = false;
  export let ariaLabel = "Sheet";
  export let title = "";
  export let subtitle = "";
  export let eyebrow = "Create";
  export let closeLabel = "Close sheet";
  export let onClose: () => void = () => {};

  const dispatch = createEventDispatcher();

  const handleClose = () => {
    onClose?.();
    dispatch("close");
  };

  const handleOverlayKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClose();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      handleClose();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleEscape);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleEscape);
  });
  $: hasActions = Boolean($$slots.actions);
</script>

{#if open}
  <div
    class="overlay"
    role="button"
    tabindex="0"
    aria-label={closeLabel}
    on:click={handleClose}
    on:keydown={handleOverlayKey}
  ></div>
  <div class="sheet" role="dialog" aria-label={ariaLabel}>
    {#if title || subtitle || eyebrow}
      <header class="sheet-header">
        {#if eyebrow}
          <p class="eyebrow">{eyebrow}</p>
        {/if}
        {#if title}
          <h2>{title}</h2>
        {/if}
        {#if subtitle}
          <p class="muted">{subtitle}</p>
        {/if}
      </header>
    {/if}
    <div class="sheet-content">
      <slot />
    </div>
    {#if hasActions}
      <div class="sheet-actions">
        <slot name="actions" />
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: fadeIn 200ms ease forwards;
    z-index: 21;
  }

  .sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    top: 0;
    height: 100vh;
    box-sizing: border-box;
    padding: var(
        --sheet-padding,
        calc(env(safe-area-inset-top, 0px) + 1rem) 1.2rem
          calc(env(safe-area-inset-bottom, 0px) + 2rem)
      );
    border-radius: 0;
    background: var(--sheet-bg, rgba(6, 8, 15, 0.94));
    display: flex;
    flex-direction: column;
    gap: var(--sheet-gap, 0.75rem);
    animation: slideUp 260ms ease forwards;
    z-index: 22;
    overflow-y: auto;
    font-size: 1.05rem;
  }

  .sheet-header {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .sheet-header h2 {
    margin: 0;
    color: #e6ecff;
  }

  .eyebrow {
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.7);
    margin: 0;
  }

  .muted {
    margin: 0;
    color: rgba(230, 236, 255, 0.72);
  }

  .sheet-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  :global(.sheet-group) {
    display: flex;
    flex-direction: column;
    padding: var(--sheet-group-padding, 0.6rem 0.75rem);
    border-radius: var(--sheet-group-radius, 16px);
    background: var(--sheet-group-bg, rgba(255, 255, 255, 0.04));
    border: 1px solid var(--sheet-group-border, rgba(255, 255, 255, 0.08));
    gap: var(--sheet-group-gap, 0.8rem);
  }

  :global(.sheet-group .group-label),
  :global(.sheet-group .sheet-label) {
    margin: 0;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.65);
  }

  :global(.sheet-grid) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.5rem;
  }

  :global(.sheet-actions) {
    display: flex;
    justify-content: flex-end;
    gap: var(--sheet-actions-gap, 0.5rem);
  }

  :global(.sheet-actions button) {
    border-radius: 10px;
    padding: 0.55rem 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    cursor: pointer;
    font-weight: 700;
  }

  :global(.sheet-actions .primary) {
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    color: #0b1021;
    border: none;
  }

  :global(.sheet-actions .ghost) {
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
  }

  :global(.error) {
    margin: 0.35rem 0 0;
    color: #ff90c2;
    font-weight: 700;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

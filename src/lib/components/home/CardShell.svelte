<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import type { CardId } from "$lib/data/home";

  export let id: CardId;
  export let isTaskCard = false;
  export let isGlass = false;
  export let isSolo = false;
  export let isDragging = false;
  export let isFiltered = false;
  export let menuOpen = false;
  export let isHidden = false;

  const dispatch = createEventDispatcher<{
    hide: { id: CardId };
    unhide: { id: CardId };
    toggleMenu: { id: CardId };
    closeMenu: { id: CardId };
    dragstart: { id: CardId; event: DragEvent };
    dragend: { id: CardId };
    drop: { id: CardId; event: DragEvent };
  }>();

  const handleDragStart = (event: DragEvent) => {
    dispatch("dragstart", { id, event });
  };

  const handleDrop = (event: DragEvent) => {
    dispatch("drop", { id, event });
  };

  const handleDragEnd = () => {
    dispatch("dragend", { id });
  };
</script>

<section
  class={`card ${isTaskCard ? "task-card" : ""} ${isGlass ? "glass" : ""} ${isDragging ? "dragging" : ""} ${isSolo ? "solo" : ""}`}
  aria-label={`${id} panel`}
  on:dragover|preventDefault
  on:drop={handleDrop}
  out:fly|local={{ y: 24, duration: 240, easing: (t) => t * t }}
  in:fly|local={{ y: -18, duration: 280, easing: (t) => t * t }}
>
  {#if !isFiltered}
    <button class="icon-btn menu-btn" aria-label="Open widget menu" on:click={() => dispatch("toggleMenu", { id })}>
      ...
    </button>
  {/if}
  {#if menuOpen}
    <div class="mini-menu">
      <button class="mini-btn" type="button" aria-label="Close menu" on:click={() => dispatch("closeMenu", { id })}>
        x
      </button>
      <button class="mini-btn" type="button" aria-label="Hide widget" on:click={() => dispatch("hide", { id })}>
        hide
      </button>
      <button class="mini-btn" type="button" aria-label="Plus action">
        +
      </button>
      <button class="mini-btn" type="button" aria-label="Minus action">
        -
      </button>
    </div>
  {/if}
  <button
    class="icon-btn move-btn"
    aria-label={`Move ${id} card`}
    draggable="true"
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
  >
    ::
  </button>

  <slot />
</section>
{#if isFiltered && isHidden}
  <div class="unhide-row">
    <span>Currently hidden</span>
    <button class="soft-button ghost" type="button" on:click={() => dispatch("unhide", { id })}>Unhide</button>
  </div>
{/if}

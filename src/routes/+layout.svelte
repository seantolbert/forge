<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { FloatingNavButton } from "$lib/components/nav";
  import { menuOpen, secondaryMenuOpen } from "$lib/stores/menu";

  let { children } = $props();

  const handleFloatingNavClick = () => {
    menuOpen.update((value) => {
      const next = !value;
      if (!next) secondaryMenuOpen.set(false);
      return next;
    });
  };
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<FloatingNavButton
  label="Menu"
  open={$menuOpen}
  secondaryOpen={$secondaryMenuOpen}
  on:click={handleFloatingNavClick}
  on:toggle-secondary={(event) => secondaryMenuOpen.set(event.detail.open)}
/>

<div
  class={`secondary-menu ${$secondaryMenuOpen ? "open" : ""}`}
  aria-hidden={!$secondaryMenuOpen}
>
  <button class="secondary-action" type="button" aria-label="Edit">
    <svg viewBox="0 0 24 24">
      <path
        d="M4 17.2V20h2.8L17.4 9.4 15 7 4 17.2Zm13.7-7.5a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-1.4 1.4L16.3 11l1.4-1.3Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <button class="secondary-action" type="button" aria-label="Events">
    <svg viewBox="0 0 24 24">
      <path
        d="M7 3v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2V3h-2v2H9V3H7Zm12 6H5v10h14V9Zm-3 3h-3v3h3v-3Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <button class="secondary-action" type="button" aria-label="Order">
    <svg viewBox="0 0 24 24">
      <path
        d="M7 4h10a2 2 0 0 1 2 2v13l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Zm2 4h6m-6 4h6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</div>

<style>
  .secondary-menu {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 40%;
    min-width: 220px;
    max-width: 320px;
    height: 80px;
    background: #9fbe86;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    transform: translateX(700px);
    transition: transform 550ms cubic-bezier(0.33, 1, 0.53, 1);
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    color: #0f172a;
    overflow: visible;
    font-weight: 700;
    pointer-events: none;
    z-index: 1;
  }

  .secondary-menu.open {
    transform: translateX(-170px);
    pointer-events: auto;
  }

  .secondary-action {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    color: #000000;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
  }

  .secondary-action svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>

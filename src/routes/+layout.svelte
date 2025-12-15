<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { goto } from "$app/navigation";
  import { icons } from "$lib/assets/icons";
  import { FloatingNavButton } from "$lib/components/nav";
  import { menuOpen, secondaryMenuOpen, navMenuOpen } from "$lib/stores/menu";

  let { children } = $props();

  const handleFloatingNavClick = () => {
    menuOpen.update((value) => {
      const next = !value;
      if (!next) {
        secondaryMenuOpen.set(false);
        navMenuOpen.set(false);
      }
      return next;
    });
  };

 const goToSettings = () => {
   goto("/settings");
   menuOpen.set(false);
   secondaryMenuOpen.set(false);
   navMenuOpen.set(false);
 };

 const goToHome = () => {
   goto("/");
   menuOpen.set(false);
   secondaryMenuOpen.set(false);
   navMenuOpen.set(false);
 };

  const goToOrders = () => {
    goto("/orders");
    menuOpen.set(false);
    secondaryMenuOpen.set(false);
    navMenuOpen.set(false);
  };

  const goToCalendar = () => {
    goto("/calendar");
    menuOpen.set(false);
    secondaryMenuOpen.set(false);
    navMenuOpen.set(false);
  };

  const goToTasks = () => {
    goto("/tasks");
    menuOpen.set(false);
    secondaryMenuOpen.set(false);
    navMenuOpen.set(false);
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
  navOpen={$navMenuOpen}
  on:click={handleFloatingNavClick}
  on:go-home={goToHome}
  on:go-settings={goToSettings}
  on:go-orders={goToOrders}
  on:go-calendar={goToCalendar}
  on:go-tasks={goToTasks}
  on:toggle-secondary={(event) => secondaryMenuOpen.set(event.detail.open)}
  on:toggle-nav={(event) => navMenuOpen.set(event.detail.open)}
/>

<div
  class={`secondary-menu ${$secondaryMenuOpen ? "open" : ""}`}
  aria-hidden={!$secondaryMenuOpen}
>
  <button class="secondary-action" type="button" aria-label="Task">
    {@html icons.task}
  </button>
  <button class="secondary-action" type="button" aria-label="Events">
    {@html icons.event}
  </button>
  <button class="secondary-action" type="button" aria-label="Order">
    {@html icons.order}
  </button>
</div>

<div
  class={`navigation-menu ${$navMenuOpen ? "open" : ""}`}
  aria-hidden={!$navMenuOpen}
>
  <button class="secondary-action" type="button" aria-label="Orders" on:click={goToOrders}>
    {@html icons.order}
  </button>
  <button class="secondary-action" type="button" aria-label="Calendar" on:click={goToCalendar}>
    {@html icons.calendar}
  </button>
  <button class="secondary-action" type="button" aria-label="Tasks" on:click={goToTasks}>
    {@html icons.tasks}
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

  .navigation-menu {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 40%;
    min-height: 220px;
    max-height: 320px;
    background: #9fbe86;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    transform: translateY(150%);
    transition: transform 550ms cubic-bezier(0.33, 1, 0.53, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: bottom;
    gap: 12px;
    padding: 12px 0;
    color: #0f172a;
    pointer-events: none;
    z-index: 1;
  }

  .navigation-menu.open {
    transform: translateY(-30px);
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

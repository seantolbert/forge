<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { icons } from "$lib/assets/icons";

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
    "toggle-secondary": { open: boolean };
    "toggle-nav": { open: boolean };
    "go-home": void;
    "go-settings": void;
    "go-orders": void;
    "go-calendar": void;
    "go-tasks": void;
  }>();

  let {
    label,
    size = "md",
    disabled = false,
    open = false,
    secondaryOpen = false,
    navOpen = false,
  } = $props<{
    label: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    open?: boolean;
    secondaryOpen?: boolean;
    navOpen?: boolean;
  }>();

  const handleClick = (event: MouseEvent) => {
    if (disabled) return;
    dispatch("click", event);
  };

  const handlePlusToggle = () => {
    if (!open) return;
    dispatch("toggle-secondary", { open: !secondaryOpen });
  };

  const handleCalendarToggle = () => {
    if (!open) return;
    dispatch("toggle-nav", { open: !navOpen });
  };

  const handleHome = () => {
    if (!open) return;
    dispatch("go-home");
  };

  const handleSettings = () => {
    if (!open) return;
    dispatch("go-settings");
  };

  const handleOrders = () => {
    if (!open) return;
    dispatch("go-orders");
  };

  const handleCalendar = () => {
    if (!open) return;
    dispatch("go-calendar");
  };

  const handleTasks = () => {
    if (!open) return;
    dispatch("go-tasks");
  };
</script>

<button
  class={`corner-btn corner-front size-${size}${open ? " open" : ""}`}
  aria-label={label}
  {disabled}
  aria-pressed={open}
  on:click={handleClick}
>
  <div class="icon-grid" aria-hidden="true">
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
  </div>
</button>

<button
  class="icon-button navigation-icon arrow-rotate"
  class:open
  class:nav-open={navOpen}
  type="button"
  aria-label="Open calendar"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleCalendarToggle}
>
  {@html icons.navigation}
</button>

<button
  class="icon-button plus-icon"
  class:open
  class:secondary-open={secondaryOpen}
  type="button"
  aria-label="Add"
  aria-hidden={!open}
  disabled={!open}
  on:click={handlePlusToggle}
>
  {@html icons.pencil}
</button>

<button
  class="icon-button home-icon"
  class:open
  type="button"
  aria-label="home"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleHome}
>
  {@html icons.home}
</button>

<button
  class="icon-button settings-icon"
  class:open
  type="button"
  aria-label="settings"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleSettings}
>
  {@html icons.settings}
</button>

<button
  class="icon-button orders-icon"
  class:open
  type="button"
  aria-label="orders"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleOrders}
>
  {@html icons.order}
</button>

<button
  class="icon-button calendar-icon"
  class:open
  type="button"
  aria-label="calendar"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleCalendar}
>
  {@html icons.calendar}
</button>

<button
  class="icon-button tasks-icon"
  class:open
  type="button"
  aria-label="tasks"
  aria-hidden={!open}
  disabled={!open}
  on:click={handleTasks}
>
  {@html icons.tasks}
</button>

<style>
  .corner-btn {
    --btn-size: 120px;
    --pad: 1rem;
    --open-grow: 70px;
    position: fixed;
    bottom: env(safe-area-inset-bottom, 0px);
    right: env(safe-area-inset-right, 0px);
    width: var(--btn-size);
    height: var(--btn-size);
    padding: var(--pad);
    border: none;
    border-radius: 100% 0 0 0;
    background: #9fbe86;
    color: #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); */
    transition:
      width 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
      height 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    backface-visibility: hidden;
    user-select: none;
  }

  .corner-back {
    background: #adbf97;
    --open-grow: 90px;
    pointer-events: none;
    transform: translate(20%, 20%) scale(0);
    transform-origin: 100% 100%;
    transition:
      opacity 420ms ease,
      transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
      width 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
      height 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .corner-back.visible {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }

  .corner-btn:hover {
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.3);
  }

  .corner-btn:active {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }

  .corner-btn:focus-visible {
    outline: 2px solid white;
    outline-offset: -6px;
  }

  .corner-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .corner-btn.open {
    width: calc(var(--btn-size) + var(--open-grow));
    height: calc(var(--btn-size) + var(--open-grow));
  }

  .icon-grid {
    position: fixed;
    right: 25px;
    bottom: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 50px;
    height: 50px;
    gap: 0;
    user-select: none;
    pointer-events: none;
    transition: gap 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tile {
    background: currentColor;
    transition: border-radius 350ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .corner-btn.open .tile {
    border-radius: 50%;
  }

  .corner-btn.open .icon-grid {
    gap: 8px;
  }

  .icon-button {
    position: fixed;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    color: #0f172a;
    opacity: 0;
    transform: scale(1);
    transition:
      opacity 420ms ease,
      transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
    z-index: 5;
  }

  .icon-button svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .icon-button.open {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  .icon-button.arrow-rotate {
    transition:
      opacity 420ms ease,
      transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .icon-button.arrow-rotate.open {
    transform: scale(1);
  }

  .icon-button.arrow-rotate.nav-open {
    transform: scale(1) rotate(-90deg);
  }

  .icon-button.plus-icon.secondary-open {
    transform: scale(1) rotate(45deg);
  }

  .navigation-icon {
    right: 18px;
    bottom: 125px;
  }

  .plus-icon {
    right: 125px;
    bottom: 16px;
  }

  .home-icon {
    right: 70px;
    bottom: 107px;
  }
  .settings-icon {
    right: 105px;
    bottom: 60px;
  }
</style>

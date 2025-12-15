<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    click: MouseEvent;
    "toggle-secondary": { open: boolean };
  }>();

  let {
    label,
    size = "md",
    disabled = false,
    open = false,
    secondaryOpen = false,
  } = $props<{
    label: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    open?: boolean;
    secondaryOpen?: boolean;
  }>();

  const handleClick = (event: MouseEvent) => {
    if (disabled) return;
    dispatch("click", event);
  };

  const handlePlusToggle = () => {
    if (!open) return;
    dispatch("toggle-secondary", { open: !secondaryOpen });
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
  class="icon-button calendar-icon"
  class:open
  type="button"
  aria-label="Open calendar"
  aria-hidden={!open}
  disabled={!open}
>
  <svg viewBox="0 0 24 24">
    <path
      d="M9 4h6m-8 4h12m-2-4v4m-8-4v4m-6 0h16v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 12h6m-6 4h4"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<button
  class="icon-button plus-icon"
  class:open
  type="button"
  aria-label="Add"
  aria-hidden={!open}
  disabled={!open}
  on:click={handlePlusToggle}
>
  <svg viewBox="0 0 24 24">
    <path
      d="M12 5v14m-7-7h14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<button
  class="icon-button tasks-icon"
  class:open
  type="button"
  aria-label="Tasks"
  aria-hidden={!open}
  disabled={!open}
>
  <svg viewBox="0 0 24 24">
    <path
      d="M9 5h6v2H9zm-2 2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Zm2 5h6m-6 3h4m-4-3.5 1.8 1.8 3.8-3.8"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<button
  class="icon-button orders-icon"
  class:open
  type="button"
  aria-label="Orders"
  aria-hidden={!open}
  disabled={!open}
>
  <svg viewBox="0 0 24 24">
    <path
      d="M7 4h10a2 2 0 0 1 2 2v13l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Zm2 5h6m-6 4h6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
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

  .calendar-icon {
    right: 18px;
    bottom: 125px;
  }

  .plus-icon {
    right: 125px;
    bottom: 16px;
  }

  .tasks-icon {
    right: 70px;
    bottom: 107px;
  }
  .orders-icon {
    right: 105px;
    bottom: 60px;
  }
</style>

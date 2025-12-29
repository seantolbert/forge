<script lang="ts">
  import AddTaskSheet from "./AddTaskSheet.svelte";
  import AddOrderSheet from "./AddOrderSheet.svelte";
  import AddProjectSheet from "./AddProjectSheet.svelte";

  type SheetType = "task" | "order" | "project" | null;

  let menuOpen = false;
  let activeSheet: SheetType = null;

  const openSheet = (sheet: Exclude<SheetType, null>) => {
    activeSheet = sheet;
    menuOpen = false;
  };

  const closeSheet = () => {
    activeSheet = null;
  };
</script>

<div class="adder">
  <AddTaskSheet open={activeSheet === "task"} onClose={closeSheet} />
  <AddOrderSheet open={activeSheet === "order"} onClose={closeSheet} />
  <AddProjectSheet open={activeSheet === "project"} onClose={closeSheet} />

  {#if menuOpen}
    <div class="mini-menu">
      <p class="menu-label">New</p>
      <div class="menu-actions">
        <button class="mini-btn" type="button" on:click={() => openSheet("task")}>Task</button>
        <button class="mini-btn" type="button" on:click={() => openSheet("order")}>Order</button>
        <button class="mini-btn" type="button" on:click={() => openSheet("project")}>Project</button>
      </div>
    </div>
  {/if}

  <button
    class="fab"
    type="button"
    on:click={() => (menuOpen = !menuOpen)}
    aria-label="Open creation menu"
    aria-expanded={menuOpen}
  >
    +
  </button>
</div>

<style>
  .adder {
    position: fixed;
    bottom: 18px;
    right: 18px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .fab {
    height: 52px;
    width: 52px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    color: #0b1021;
    font-size: 1.8rem;
    font-weight: 900;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .mini-menu {
    position: absolute;
    right: 0;
    bottom: 70px;
    padding: 0.6rem 0.7rem;
    border-radius: 14px;
    background: rgba(6, 8, 15, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    z-index: 20;
  }

  .menu-label {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.7);
  }

  .menu-actions {
    display: flex;
    gap: 0.35rem;
  }

  .mini-btn {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.08);
    color: #e6ecff;
    border-radius: 10px;
    padding: 0.45rem 0.75rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }

  .mini-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
</style>

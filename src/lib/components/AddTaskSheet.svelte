<script lang="ts">
  import { addTask } from "$lib/stores/tasks";

  export let open = false;
  export let onClose: () => void;

  let title = "";

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    title = "";
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClose();
    }
  };
</script>

{#if open}
  <div
    class="overlay"
    role="button"
    tabindex="0"
    aria-label="Close add task"
    on:click={handleClose}
    on:keydown={handleKey}
  ></div>
  <form class="sheet" on:submit={handleSubmit}>
    <label>
      <span>Add task</span>
      <input
        name="title"
        placeholder="Type a task"
        bind:value={title}
        autocomplete="off"
        autocapitalize="sentences"
      />
    </label>
    <div class="actions">
      <button type="button" class="ghost" on:click={handleClose}>Cancel</button>
      <button type="submit" class="primary">Add</button>
    </div>
  </form>
{/if}

<style>
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
    padding: calc(env(safe-area-inset-top, 0px) + 1rem) 1.2rem
      calc(env(safe-area-inset-bottom, 0px) + 2rem);
    border-radius: 0;
    background: rgba(6, 8, 15, 0.94);
    /* border: 1px solid rgba(255, 255, 255, 0.12); */
    /* backdrop-filter: blur(14px); */
    /* -webkit-backdrop-filter: blur(14px); */
    /* box-shadow: 0 -12px 28px rgba(0, 0, 0, 0.35); */
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    animation: slideUp 260ms ease forwards;
    z-index: 22;
    overflow-y: auto;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.85);
    font-weight: 700;
  }

  input {
    /* width: 100%; */
    padding: 0.65rem;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .actions button {
    border-radius: 10px;
    padding: 0.55rem 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    cursor: pointer;
    font-weight: 700;
  }

  .actions .primary {
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    color: #0b1021;
    border: none;
  }

  .actions .ghost {
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
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

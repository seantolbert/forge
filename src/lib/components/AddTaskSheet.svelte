<script lang="ts">
  import { addTask } from "$lib/stores/tasks";

  export let open = false;
  export let onClose: () => void;

  let title = "";
  let description = "";
  let status = "backlog";
  let frequency = "one-off";
  let folder = "";
  let due = "";
  let start = "";
  let estimateMinutes = "";
  let linkedOrders = "";
  let linkedEvents = "";

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    title = "";
    description = "";
    status = "backlog";
    frequency = "one-off";
    folder = "";
    due = "";
    start = "";
    estimateMinutes = "";
    linkedOrders = "";
    linkedEvents = "";
    onClose();
  };

  const handleClose = () => {
    title = "";
    description = "";
    status = "backlog";
    frequency = "one-off";
    folder = "";
    due = "";
    start = "";
    estimateMinutes = "";
    linkedOrders = "";
    linkedEvents = "";
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
    <header class="sheet-header">
      <p class="eyebrow">Create</p>
      <h2>New task</h2>
      <p class="muted">Capture core fields plus links to orders and events.</p>
    </header>

    <section class="group">
      <p class="group-label">Core</p>
      <label>
        <span>Title</span>
        <input
          name="title"
          placeholder="Type a task"
          bind:value={title}
          autocomplete="off"
          autocapitalize="sentences"
          required
        />
      </label>
      <label>
        <span>Description / Notes</span>
        <textarea
          name="description"
          placeholder="Add context"
          bind:value={description}
          rows="3"
        ></textarea>
      </label>
      <div class="grid two">
        <label>
          <span>Status</span>
          <select name="status" bind:value={status}>
            <option value="backlog">Backlog</option>
            <option value="todo">To do</option>
            <option value="doing">Doing</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </label>
        <label>
          <span>Frequency</span>
          <select name="frequency" bind:value={frequency}>
            <option value="one-off">One-off</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <label>
        <span>Folder</span>
        <input
          name="folder"
          placeholder="Pick or create a folder"
          bind:value={folder}
        />
      </label>
      <div class="grid two">
        <label>
          <span>Due date / time</span>
          <input name="due" type="datetime-local" bind:value={due} />
        </label>
        <label>
          <span>Start date / time</span>
          <input name="start" type="datetime-local" bind:value={start} />
        </label>
      </div>
      <label>
        <span>Estimated duration (minutes)</span>
        <input
          name="estimateMinutes"
          type="number"
          min="0"
          placeholder="e.g., 45"
          bind:value={estimateMinutes}
        />
      </label>
    </section>

    <section class="group">
      <p class="group-label">Associations</p>
      <label>
        <span>Linked Orders</span>
        <input
          name="linkedOrders"
          placeholder="Search and select orders"
          bind:value={linkedOrders}
        />
      </label>
      <label>
        <span>Linked Events</span>
        <input
          name="linkedEvents"
          placeholder="Search and select events"
          bind:value={linkedEvents}
        />
      </label>
    </section>

    <div class="actions">
      <button type="button" class="ghost" on:click={handleClose}>Cancel</button>
      <button type="submit" class="primary">Add task</button>
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
    padding: 0.65rem;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
  }

  textarea,
  select {
    padding: 0.65rem;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
    font-family: inherit;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .sheet-header {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin-bottom: 0.35rem;
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
    color: rgba(230, 236, 255, 0.7);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.6rem 0.75rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .group-label {
    margin: 0;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.65);
  }

  .grid.two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.5rem;
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

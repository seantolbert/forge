<script lang="ts">
  export let open = false;
  export let onClose: () => void;

  type InlineTask = {
    title: string;
    priority: string;
    due: string;
    folder: string;
  };

  type InlineEvent = {
    title: string;
    start: string;
    end: string;
    location: string;
    description: string;
  };

  let orderSource = "manual";
  let externalId = "";
  let status = "new";
  let placedAt = "";

  let customerName = "";
  let customerEmail = "";

  let subtotal = "";
  let tax = "";
  let shipping = "";
  let total = "";

  let address1 = "";
  let address2 = "";
  let city = "";
  let state = "";
  let postal = "";
  let country = "";

  let notes = "";
  let inlineTasks: InlineTask[] = [{ title: "", priority: "", due: "", folder: "" }];
  let createEvent = false;
  let inlineEvent: InlineEvent = { title: "", start: "", end: "", location: "", description: "" };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!orderSource.trim()) return;
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    orderSource = "manual";
    externalId = "";
    status = "new";
    placedAt = "";
    customerName = "";
    customerEmail = "";
    subtotal = "";
    tax = "";
    shipping = "";
    total = "";
    address1 = "";
    address2 = "";
    city = "";
    state = "";
    postal = "";
    country = "";
    notes = "";
    inlineTasks = [{ title: "", priority: "", due: "", folder: "" }];
    createEvent = false;
    inlineEvent = { title: "", start: "", end: "", location: "", description: "" };
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClose();
    }
  };

  const addInlineTask = () => {
    inlineTasks = [
      ...inlineTasks,
      { title: "", priority: "", due: "", folder: "" }
    ];
  };

  const removeInlineTask = (index: number) => {
    if (inlineTasks.length === 1) return;
    inlineTasks = inlineTasks.filter((_, i) => i !== index);
  };
</script>

{#if open}
  <div
    class="overlay"
    role="button"
    tabindex="0"
    aria-label="Close add order"
    on:click={handleClose}
    on:keydown={handleKey}
  ></div>
  <form class="sheet" on:submit={handleSubmit}>
    <header class="sheet-header">
      <p class="eyebrow">Create</p>
      <h2>New order</h2>
      <p class="muted">Source-of-truth card with customer, totals, and optional links.</p>
    </header>

    <section class="group">
      <p class="group-label">Core</p>
      <div class="grid two">
        <label>
          <span>Order Source</span>
          <select name="orderSource" bind:value={orderSource} required>
            <option value="manual">Manual</option>
            <option value="etsy">Etsy</option>
            <option value="shopify">Shopify</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          <span>External Order ID</span>
          <input
            name="externalId"
            placeholder="Marketplace or POS ID"
            bind:value={externalId}
          />
        </label>
      </div>
      <div class="grid two">
        <label>
          <span>Status</span>
          <select name="status" bind:value={status}>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="canceled">Canceled</option>
            <option value="refunded">Refunded</option>
          </select>
        </label>
        <label>
          <span>Placed At</span>
          <input name="placedAt" type="datetime-local" bind:value={placedAt} />
        </label>
      </div>
    </section>

    <section class="group">
      <p class="group-label">Customer</p>
      <div class="grid two">
        <label>
          <span>Customer Name</span>
          <input name="customerName" placeholder="Customer" bind:value={customerName} />
        </label>
        <label>
          <span>Customer Email</span>
          <input name="customerEmail" type="email" placeholder="email@example.com" bind:value={customerEmail} />
        </label>
      </div>
    </section>

    <section class="group">
      <p class="group-label">Financials</p>
      <div class="grid two">
        <label>
          <span>Subtotal</span>
          <input name="subtotal" type="number" step="0.01" min="0" bind:value={subtotal} />
        </label>
        <label>
          <span>Tax</span>
          <input name="tax" type="number" step="0.01" min="0" bind:value={tax} />
        </label>
      </div>
      <div class="grid two">
        <label>
          <span>Shipping</span>
          <input name="shipping" type="number" step="0.01" min="0" bind:value={shipping} />
        </label>
        <label>
          <span>Total</span>
          <input name="total" type="number" step="0.01" min="0" bind:value={total} />
        </label>
      </div>
    </section>

    <section class="group">
      <p class="group-label">Shipping Address</p>
      <label>
        <span>Address Line 1</span>
        <input name="address1" placeholder="Street address" bind:value={address1} />
      </label>
      <label>
        <span>Address Line 2</span>
        <input name="address2" placeholder="Apartment, suite, etc." bind:value={address2} />
      </label>
      <div class="grid two">
        <label>
          <span>City</span>
          <input name="city" bind:value={city} />
        </label>
        <label>
          <span>State / Province</span>
          <input name="state" bind:value={state} />
        </label>
      </div>
      <div class="grid two">
        <label>
          <span>Postal Code</span>
          <input name="postal" bind:value={postal} />
        </label>
        <label>
          <span>Country</span>
          <input name="country" bind:value={country} />
        </label>
      </div>
    </section>

    <section class="group">
      <p class="group-label">Notes</p>
      <textarea
        name="notes"
        placeholder="Order notes, packing info, links"
        bind:value={notes}
        rows="3"
      ></textarea>
    </section>

    <section class="group">
      <p class="group-label">Tasks inside order</p>
      {#each inlineTasks as task, index}
        <div class="inline-row">
          <input
            name={`task-title-${index}`}
            placeholder="Task title"
            bind:value={task.title}
          />
          <select name={`task-priority-${index}`} bind:value={task.priority}>
            <option value="">Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            name={`task-due-${index}`}
            type="datetime-local"
            bind:value={task.due}
          />
          <input
            name={`task-folder-${index}`}
            placeholder="Folder"
            bind:value={task.folder}
          />
          <button
            type="button"
            class="ghost tiny"
            on:click={() => removeInlineTask(index)}
            aria-label="Remove task row"
          >
            Remove
          </button>
        </div>
      {/each}
      <button type="button" class="ghost tiny" on:click={addInlineTask}>Add task row</button>
    </section>

    <section class="group">
      <p class="group-label">Optional event</p>
      <label class="inline">
        <input name="createEvent" type="checkbox" bind:checked={createEvent} />
        <span>Create event</span>
      </label>
      {#if createEvent}
        <div class="grid two">
          <label>
            <span>Event title</span>
            <input name="eventTitle" placeholder="Fulfillment slot" bind:value={inlineEvent.title} />
          </label>
          <label>
            <span>Event location</span>
            <input name="eventLocation" placeholder="Shop, warehouse, remote" bind:value={inlineEvent.location} />
          </label>
        </div>
        <div class="grid two">
          <label>
            <span>Event start date / time</span>
            <input name="eventStart" type="datetime-local" bind:value={inlineEvent.start} />
          </label>
          <label>
            <span>Event end date / time</span>
            <input name="eventEnd" type="datetime-local" bind:value={inlineEvent.end} />
          </label>
        </div>
        <label>
          <span>Event description</span>
          <textarea
            name="eventDescription"
            placeholder="Details, attendees, links"
            bind:value={inlineEvent.description}
            rows="3"
          ></textarea>
        </label>
      {/if}
    </section>

    <div class="actions">
      <button type="button" class="ghost" on:click={handleClose}>Cancel</button>
      <button type="submit" class="primary">Save order</button>
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
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    animation: slideUp 260ms ease forwards;
    z-index: 22;
    overflow-y: auto;
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

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.85);
    font-weight: 700;
  }

  input,
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

  .inline {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .inline-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.4rem;
    align-items: center;
  }

  .ghost.tiny {
    padding: 0.4rem 0.65rem;
    font-size: 0.9rem;
  }
</style>

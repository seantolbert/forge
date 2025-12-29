<script lang="ts">
  import SheetLayout from "./SheetLayout.svelte";
  import Field from "./Field.svelte";
  import InlineTaskRow from "./InlineTaskRow.svelte";
  import OptionalEventFields, { type InlineEvent } from "./OptionalEventFields.svelte";

  export let open = false;
  export let onClose: () => void;

  type InlineTask = {
    title: string;
    priority: string;
    due: string;
    folder: string;
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
  const formId = "order-form";

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

<SheetLayout
  open={open}
  aria-label="Add order"
  title="New order"
  subtitle="Source-of-truth card with customer, totals, and optional links."
  closeLabel="Close add order"
  onClose={handleClose}
>
  <form class="order-form" id={formId} on:submit={handleSubmit}>
    <section class="sheet-group">
      <p class="group-label">Core</p>
      <div class="sheet-grid">
        <Field label="Order Source" required>
          <select name="orderSource" bind:value={orderSource} required>
            <option value="manual">Manual</option>
            <option value="etsy">Etsy</option>
            <option value="shopify">Shopify</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="External Order ID">
          <input
            name="externalId"
            placeholder="Marketplace or POS ID"
            bind:value={externalId}
          />
        </Field>
      </div>
      <div class="sheet-grid">
        <Field label="Status">
          <select name="status" bind:value={status}>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="canceled">Canceled</option>
            <option value="refunded">Refunded</option>
          </select>
        </Field>
        <Field label="Placed At">
          <input name="placedAt" type="datetime-local" bind:value={placedAt} />
        </Field>
      </div>
    </section>

    <section class="sheet-group">
      <p class="group-label">Customer</p>
      <div class="sheet-grid">
        <Field label="Customer Name">
          <input name="customerName" placeholder="Customer" bind:value={customerName} />
        </Field>
        <Field label="Customer Email">
          <input name="customerEmail" type="email" placeholder="email@example.com" bind:value={customerEmail} />
        </Field>
      </div>
    </section>

    <section class="sheet-group">
      <p class="group-label">Financials</p>
      <div class="sheet-grid">
        <Field label="Subtotal">
          <input name="subtotal" type="number" step="0.01" min="0" bind:value={subtotal} />
        </Field>
        <Field label="Tax">
          <input name="tax" type="number" step="0.01" min="0" bind:value={tax} />
        </Field>
      </div>
      <div class="sheet-grid">
        <Field label="Shipping">
          <input name="shipping" type="number" step="0.01" min="0" bind:value={shipping} />
        </Field>
        <Field label="Total">
          <input name="total" type="number" step="0.01" min="0" bind:value={total} />
        </Field>
      </div>
    </section>

    <section class="sheet-group">
      <p class="group-label">Shipping Address</p>
      <Field label="Address Line 1">
        <input name="address1" placeholder="Street address" bind:value={address1} />
      </Field>
      <Field label="Address Line 2">
        <input name="address2" placeholder="Apartment, suite, etc." bind:value={address2} />
      </Field>
      <div class="sheet-grid">
        <Field label="City">
          <input name="city" bind:value={city} />
        </Field>
        <Field label="State / Province">
          <input name="state" bind:value={state} />
        </Field>
      </div>
      <div class="sheet-grid">
        <Field label="Postal Code">
          <input name="postal" bind:value={postal} />
        </Field>
        <Field label="Country">
          <input name="country" bind:value={country} />
        </Field>
      </div>
    </section>

    <section class="sheet-group">
      <p class="group-label">Notes</p>
      <Field label="Order notes">
        <textarea
          name="notes"
          placeholder="Order notes, packing info, links"
          bind:value={notes}
          rows="3"
        ></textarea>
      </Field>
    </section>

    <section class="sheet-group">
      <p class="group-label">Tasks inside order</p>
      {#each inlineTasks as task, index}
        <InlineTaskRow
          bind:task={inlineTasks[index]}
          {index}
          canRemove={inlineTasks.length > 1}
          on:remove={() => removeInlineTask(index)}
        />
      {/each}
      <button type="button" class="ghost tiny" on:click={addInlineTask}>Add task row</button>
    </section>

    <section class="sheet-group">
      <p class="group-label">Optional event</p>
      <OptionalEventFields bind:createEvent bind:inlineEvent />
    </section>

  </form>
  <svelte:fragment slot="actions">
    <button type="button" class="ghost" on:click={handleClose}>Cancel</button>
    <button type="submit" class="primary" form={formId}>Save order</button>
  </svelte:fragment>
</SheetLayout>

<style>
  .order-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ghost.tiny {
    padding: 0.4rem 0.65rem;
    font-size: 0.9rem;
  }
</style>

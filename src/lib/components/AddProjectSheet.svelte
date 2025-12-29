<script lang="ts">
  import SheetLayout from "./SheetLayout.svelte";
  import Field from "./Field.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import { createProject } from "$lib/stores/projects";

  export let open = false;
  export let onClose: () => void;

  let name = "";
  let summary = "";
  let due = "";
  let color = "#5ee2a0";
  let submitting = false;
  let submitError = "";
  const formId = "project-form";

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    submitting = true;
    submitError = "";
    const { error } = await createProject(name, summary, due, color);
    submitting = false;
    if (error) {
      submitError = "Could not create project. Please try again.";
      return;
    }
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    name = "";
    summary = "";
    due = "";
    color = "#5ee2a0";
    submitting = false;
    submitError = "";
  };
</script>

<SheetLayout
  open={open}
  aria-label="Add project"
  title="New project"
  subtitle="Give it a name, short summary, and optional due date."
  closeLabel="Close add project"
  onClose={handleClose}
>
  <form class="project-form" aria-label="Add project" id={formId} on:submit={handleSubmit}>
    <section class="sheet-group">
      <Field label="Name" required>
        <input
          name="name"
          placeholder="Project name"
          bind:value={name}
          autocomplete="off"
          required
        />
      </Field>
      <Field label="Summary">
        <input
          name="summary"
          placeholder="Optional summary"
          bind:value={summary}
          autocomplete="off"
        />
      </Field>
      <Field label="Due date">
        <input name="due" type="date" bind:value={due} />
      </Field>
      <Field label="Color">
        <ColorPicker name="color" label="Project color" bind:value={color} />
      </Field>
    </section>

    {#if submitError}
      <p class="error">{submitError}</p>
    {/if}
  </form>
  <svelte:fragment slot="actions">
    <button type="button" class="ghost" on:click={handleClose} disabled={submitting}>Cancel</button>
    <button type="submit" class="primary" form={formId} disabled={submitting}>
      {submitting ? "Saving..." : "Create project"}
    </button>
  </svelte:fragment>
</SheetLayout>

<style lang="postcss">
  .project-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>

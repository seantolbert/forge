<script lang="ts">
  import SheetLayout from "./SheetLayout.svelte";
  import TaskFormFields from "./TaskFormFields.svelte";
  import { loadTasks } from "$lib/stores/tasks";
  import { createTask, updateTask } from "$lib/api/tasks";
  import { onMount, onDestroy } from "svelte";
  import type { Task } from "$lib/components/home/types";
  import {
    createTaskForm,
    taskFormDefaults,
    type TaskFormState,
  } from "$lib/hooks/useTaskForm";
  import { useProjects } from "$lib/hooks/useProjects";

  // Controls sheet visibility, closing handler, and optional task to edit.
  export let open = false;
  export let onClose: () => void;
  export let task: Task | null = null;

  // Form state managed by helper; UI toggles.
  const form = createTaskForm();
  let formState: TaskFormState = { ...taskFormDefaults };
  const unsubscribeForm = form.state.subscribe((value) => (formState = value));
  let showProjectForm = false;
  let submitting = false;
  let submitError = "";
  let projectError = "";
  let currentTaskId: string | null = null;
  // Used to tie footer submit to the form element.
  const formId = "task-form";
  const projects = useProjects();
  const { projectsStore } = projects;

  // Convert ISO to datetime-local value respecting local TZ offset.
  // Clears local form state (used on submit success and close).
  const resetForm = () => {
    form.reset();
    showProjectForm = false;
    submitting = false;
    submitError = "";
    projectError = "";
    currentTaskId = null;
  };

  // Pre-fills fields when editing an existing task.
  const populateFromTask = (selected: Task) => {
    currentTaskId = selected.id;
    form.fromTask(selected);
  };

  // Reactive edit flag based on provided task.
  $: isEditing = Boolean(task);

  // When opened with a new task, populate fields; when cleared, reset.
  $: if (open && task && task.id !== currentTaskId) {
    populateFromTask(task);
  } else if (open && !task && currentTaskId) {
    resetForm();
  }

  // Load projects once when the sheet mounts to populate the selector.
  onMount(async () => {
    await projects.load();
    projectError = projects.error;
  });
  onDestroy(() => {
    unsubscribeForm();
  });

  // Create or update a task, then refresh the task list and close.
  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!formState.title.trim()) return;
    submitting = true;
    submitError = "";
    const payload = form.toPayload();

    const { error } =
      isEditing && currentTaskId
        ? await updateTask(currentTaskId, payload)
        : await createTask(payload);

    submitting = false;
    if (error) {
      submitError = isEditing
        ? "Could not update task. Please try again."
        : "Could not add task. Please try again.";
      console.error(error);
      return;
    }
    resetForm();
    await loadTasks();
    onClose();
  };

  // Local close that also resets form state.
  const handleClose = () => {
    resetForm();
    onClose();
  };
</script>

<SheetLayout
  {open}
  aria-label={isEditing ? "Edit task" : "Add task"}
  eyebrow={isEditing ? "Update" : "Create"}
  title={isEditing ? "Edit task" : "New task"}
  subtitle="Tasks can include notes, linked orders, and optional reminders."
  closeLabel={isEditing ? "Close edit task" : "Close add task"}
  onClose={handleClose}
>
  <form class="task-form" id={formId} on:submit={handleSubmit}>
    <TaskFormFields
      state={formState}
      onChange={(next) => form.setState(next)}
      projects={$projectsStore}
      bind:showProjectForm
      {projectError}
      on:projectSelected={({ detail }) =>
        form.setState({ projectId: detail.id ?? "" })}
    />
    {#if submitError}
      <p class="error">{submitError}</p>
    {/if}
  </form>
  <svelte:fragment slot="actions">
    <button
      type="button"
      class="ghost"
      on:click={handleClose}
      disabled={submitting}>Cancel</button
    >
    <button type="submit" class="primary" form={formId} disabled={submitting}>
      {submitting
        ? isEditing
          ? "Saving..."
          : "Adding..."
        : isEditing
          ? "Save changes"
          : "Add task"}
    </button>
  </svelte:fragment>
</SheetLayout>

<style lang="postcss">
  .task-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>

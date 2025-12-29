<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Field from "./Field.svelte";

  export type InlineTask = {
    title: string;
    priority: string;
    due: string;
    folder: string;
  };

  export let task: InlineTask;
  export let index: number;
  export let canRemove = true;

  const dispatch = createEventDispatcher<{ remove: { index: number } }>();
</script>

<div class="inline-row">
  <Field label="Task title">
    <input
      name={`task-title-${index}`}
      placeholder="Task title"
      bind:value={task.title}
    />
  </Field>
  <Field label="Priority">
    <select name={`task-priority-${index}`} bind:value={task.priority}>
      <option value="">Priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </Field>
  <Field label="Due">
    <input
      name={`task-due-${index}`}
      type="datetime-local"
      bind:value={task.due}
    />
  </Field>
  <Field label="Folder">
    <input
      name={`task-folder-${index}`}
      placeholder="Folder"
      bind:value={task.folder}
    />
  </Field>
  <button
    type="button"
    class="ghost tiny"
    on:click={() => canRemove && dispatch("remove", { index })}
    aria-label="Remove task row"
    disabled={!canRemove}
  >
    Remove
  </button>
</div>

<style>
  .inline-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.4rem;
    align-items: end;
  }

  .ghost.tiny {
    padding: 0.45rem 0.65rem;
    font-size: 0.9rem;
    height: 100%;
    align-self: stretch;
  }
</style>

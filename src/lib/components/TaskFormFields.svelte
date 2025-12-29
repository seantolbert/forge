<script lang="ts">
  import Field from "./Field.svelte";
  import CheckboxRow from "./CheckboxRow.svelte";
  import ProjectQuickCreate from "./ProjectQuickCreate.svelte";
  import { autoSize } from "$lib/actions/autoSize";
  import type { Project } from "$lib/components/home/types";
  import type { TaskFormState } from "$lib/hooks/useTaskForm";
  import { createEventDispatcher } from "svelte";

  export let state: TaskFormState;
  export let onChange: (next: Partial<TaskFormState>) => void;
  export let projects: Project[];
  export let projectError = "";
  export let showProjectForm = false;

  const dispatch = createEventDispatcher<{ projectSelected: { id: string | null } }>();
</script>

<section class="sheet-group">
  <Field label="Title" required>
    <input
      name="title"
      placeholder="Title"
      value={state.title}
      on:input={(event) => onChange({ title: (event.currentTarget as HTMLInputElement).value })}
      autocomplete="off"
      autocapitalize="sentences"
      required
    />
  </Field>
  <Field label="Notes" helper="Supports multiple lines and links.">
    <textarea
      class="auto-size"
      name="description"
      placeholder="Notes"
      value={state.description}
      on:input={(event) => onChange({ description: (event.currentTarget as HTMLTextAreaElement).value })}
      rows="1"
      use:autoSize
    ></textarea>
  </Field>
  <div class="group-divider" aria-hidden="true"></div>
  <Field label="URL">
    <input
      name="url"
      type="url"
      placeholder="URL"
      value={state.url}
      on:input={(event) => onChange({ url: (event.currentTarget as HTMLInputElement).value })}
      inputmode="url"
    />
  </Field>
</section>

<section class="sheet-group">
  <div class="sheet-grid">
    <Field label="Frequency">
      <select
        name="frequency"
        value={state.frequency}
        on:change={(event) => onChange({ frequency: (event.currentTarget as HTMLSelectElement).value })}
      >
        <option value="one-off">One-off</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </Field>
  </div>

  <Field label="Due date / time">
    <input
      name="due"
      type="datetime-local"
      value={state.due}
      on:input={(event) => onChange({ due: (event.currentTarget as HTMLInputElement).value })}
    />
  </Field>
  <CheckboxRow>
    <Field inline>
      <input
        type="checkbox"
        checked={state.notify}
        name="notify"
        on:change={(event) => onChange({ notify: (event.currentTarget as HTMLInputElement).checked })}
      />
      <span>Notify me</span>
    </Field>
    <Field inline>
      <input
        type="checkbox"
        checked={state.createEvent}
        name="createEvent"
        on:change={(event) => onChange({ createEvent: (event.currentTarget as HTMLInputElement).checked })}
      />
      <span>Create calendar event</span>
    </Field>
  </CheckboxRow>
</section>

<section class="sheet-group">
  <p class="sheet-label">Associations</p>
  <Field label="Project">
    <select
      value={state.projectId}
      on:change={(event) => onChange({ projectId: (event.currentTarget as HTMLSelectElement).value })}
    >
      <option value="">No project</option>
      {#each projects as project}
        <option value={project.id}>{project.name}</option>
      {/each}
    </select>
  </Field>
  {#if projectError}
    <p class="error">{projectError}</p>
  {/if}
  <ProjectQuickCreate
    bind:open={showProjectForm}
    on:created={(event) => {
      const createdId = event.detail.project?.id ?? null;
      onChange({ projectId: createdId ?? "" });
      dispatch("projectSelected", { id: createdId });
    }}
  />
  <Field label="Linked Orders">
    <input
      name="linkedOrders"
      placeholder="Search and select orders"
      value={state.linkedOrders}
      on:input={(event) => onChange({ linkedOrders: (event.currentTarget as HTMLInputElement).value })}
    />
  </Field>
</section>

<style lang="postcss">
  .group-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0.1rem 0;
  }

  .auto-size {
    resize: none;
    overflow: hidden;
  }
</style>

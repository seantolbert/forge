<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "$lib/components/home/types";
  import Field from "./Field.svelte";
  import { createProject } from "$lib/stores/projects";

  export let open = false;

  let projectName = "";
  let projectSummary = "";
  let submitting = false;
  let projectError = "";

  const dispatch = createEventDispatcher<{ created: { project: Project } }>();

  const handleCreate = async () => {
    projectError = "";
    if (!projectName.trim()) {
      projectError = "Project name required.";
      return;
    }
    submitting = true;
    const { data, error } = await createProject(projectName, projectSummary);
    submitting = false;
    if (error) {
      projectError = "Could not create project.";
      return;
    }
    projectName = "";
    projectSummary = "";
    open = false;
    dispatch("created", { project: data });
  };
</script>

<details class="project-form" bind:open>
  <summary>Create project</summary>
  <div class="project-form-body">
    <div class="sheet-grid">
      <Field label="Name" required>
        <input
          name="projectName"
          placeholder="Project name"
          bind:value={projectName}
          autocomplete="off"
          required
        />
      </Field>
      <Field label="Summary">
        <input
          name="projectSummary"
          placeholder="Optional summary"
          bind:value={projectSummary}
          autocomplete="off"
        />
      </Field>
    </div>
    <button type="button" class="soft-button tiny" on:click={handleCreate} disabled={submitting}>
      {submitting ? "Saving..." : "Save project"}
    </button>
    {#if projectError}
      <p class="error">{projectError}</p>
    {/if}
  </div>
</details>

<style lang="postcss">
  .project-form {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 0.45rem 0.55rem;
    background: rgba(255, 255, 255, 0.03);
  }

  .project-form summary {
    cursor: pointer;
    font-weight: 800;
    color: rgba(230, 236, 255, 0.85);
  }

  .project-form-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.35rem;
  }
</style>

<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { loadTasks } from "$lib/stores/tasks";
  import { projectsStore, loadProjects, createProject } from "$lib/stores/projects";
  import { onMount } from "svelte";

  export let open = false;
  export let onClose: () => void;

  let title = "";
  let description = "";
  let frequency = "one-off";
  let due = "";
  let linkedOrders = "";
  let url = "";
  let projectId = "";
  let projectName = "";
  let projectSummary = "";
  let showProjectForm = false;
  let notify = false;
  let createEvent = false;
  let submitting = false;
  let submitError = "";
  let projectError = "";

  const autoSize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 44)}px`;
  };

  onMount(async () => {
    const { error } = await loadProjects();
    if (error) {
      projectError = "Unable to load projects.";
    }
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    submitting = true;
    submitError = "";
    const { error } = await supabase.from("tasks").insert({
      title: title.trim(),
      notes: description.trim() || null,
      url: url.trim() || null,
      frequency,
      due_at: due || null,
      notify,
      create_event: createEvent,
      project_id: projectId || null,
      linked_orders: linkedOrders.trim() || null,
      status: "todo"
    });
  submitting = false;
    if (error) {
      submitError = "Could not add task. Please try again.";
      console.error(error);
      return;
    }
    title = "";
    description = "";
    frequency = "one-off";
    due = "";
    linkedOrders = "";
    url = "";
    projectId = "";
    notify = false;
    createEvent = false;
    await loadTasks();
    onClose();
  };

  const handleClose = () => {
    title = "";
    description = "";
    frequency = "one-off";
    due = "";
    linkedOrders = "";
    url = "";
    projectId = "";
    notify = false;
    createEvent = false;
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
    <section class="group">
      <label>
        <input
          name="title"
          placeholder="Title"
          bind:value={title}
          autocomplete="off"
          autocapitalize="sentences"
          required
        />
      </label>
      <label>
        <textarea
          name="description"
          placeholder="Notes"
          bind:value={description}
          rows="1"
          on:input={(event) =>
            autoSize(event.currentTarget as HTMLTextAreaElement)}
        ></textarea>
      </label>
      <div class="group-divider" aria-hidden="true"></div>
      <label>
        <input
          name="url"
          type="url"
          placeholder="URL"
          bind:value={url}
          inputmode="url"
        />
      </label>
    </section>

    <section class="group">
      <div class="grid two">
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

      <label class="stacked">
        <span>Due date / time</span>
        <input name="due" type="datetime-local" bind:value={due} />
      </label>
      <div class="checkbox-row">
        <label class="checkbox">
          <input type="checkbox" bind:checked={notify} name="notify" />
          <span>Notify me</span>
        </label>
        <label class="checkbox">
          <input
            type="checkbox"
            bind:checked={createEvent}
            name="createEvent"
          />
          <span>Create calendar event</span>
        </label>
      </div>
    </section>

    <section class="group">
      <p class="group-label">Associations</p>
      <label class="stacked">
        <span>Project</span>
        <select bind:value={projectId}>
          <option value="">No project</option>
          {#each $projectsStore as project}
            <option value={project.id}>{project.name}</option>
          {/each}
        </select>
      </label>
      {#if projectError}
        <p class="error">{projectError}</p>
      {/if}
      <details class="project-form" bind:open={showProjectForm}>
        <summary>Create project</summary>
        <div class="grid two">
          <label>
            <span>Name</span>
            <input
              name="projectName"
              placeholder="Project name"
              bind:value={projectName}
            />
          </label>
          <label>
            <span>Summary</span>
            <input
              name="projectSummary"
              placeholder="Optional summary"
              bind:value={projectSummary}
            />
          </label>
        </div>
        <button
          type="button"
          class="soft-button tiny"
          on:click={async () => {
            projectError = "";
            if (!projectName.trim()) {
              projectError = "Project name required.";
              return;
            }
            const { data, error } = await createProject(projectName, projectSummary);
            if (error) {
              projectError = "Could not create project.";
              return;
            }
            projectId = data?.id ?? null;
            projectName = "";
            projectSummary = "";
            showProjectForm = false;
          }}
        >
          Save project
        </button>
      </details>
      <label>
        <span>Linked Orders</span>
        <input
          name="linkedOrders"
          placeholder="Search and select orders"
          bind:value={linkedOrders}
        />
      </label>
    </section>

    <div class="actions">
      <button type="button" class="ghost" on:click={handleClose} disabled={submitting}>Cancel</button>
      <button type="submit" class="primary" disabled={submitting}>
        {submitting ? "Adding..." : "Add task"}
      </button>
    </div>
    {#if submitError}
      <p class="error">{submitError}</p>
    {/if}
  </form>
{/if}

<style lang="postcss">
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
    font-size: 1.05rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.85);
    font-weight: 700;
    width: 100%;
  }

  input {
    padding: 0.65rem;
    border: none;
    background: none;
    width: 100%;
    font-size: 18px;
  }

  textarea,
  select {
    padding: 0.65rem;
    border: none;
    background: none;
    color: #e6ecff;
    font-family: inherit;
    width: 100%;
    font-size: 18px;
  }

  textarea {
    resize: none;
    min-height: 44px;
    overflow: hidden;
  }

  .group {
    display: flex;
    flex-direction: column;
    padding: 0.6rem 0.75rem;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.04);
    gap: 1rem;
  }

  .group-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0.1rem 0;
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
  }

  .stacked {
    gap: 0.4rem;
  }

  .checkbox-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 700;
    color: rgba(230, 236, 255, 0.85);
  }

  .checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #d6e3ff;
  }

  .project-form {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 0.45rem 0.55rem;
    background: rgba(255, 255, 255, 0.03);
  }

  .project-form summary {
    cursor: pointer;
    font-weight: 800;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .actions button {
    border-radius: 10px;
    padding: 0.55rem 0.85rem;
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

  .error {
    margin: 0.35rem 0 0;
    color: #ff90c2;
    font-weight: 700;
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

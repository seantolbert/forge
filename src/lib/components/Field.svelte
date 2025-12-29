<script lang="ts">
  export let label: string | null = null;
  export let helper: string | null = null;
  export let inline = false;
  export let required = false;
</script>

<label class={`field ${inline ? "field-inline" : ""}`}>
  {#if label}
    <span class="field-label">
      {label}
      {#if required}
        <span aria-hidden="true" class="field-required">*</span>
      {/if}
    </span>
  {/if}
  <slot />
  {#if helper}
    <p class="field-helper">{helper}</p>
  {/if}
</label>

<style lang="postcss">
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.85);
    font-weight: 700;
    width: 100%;
  }

  .field-inline {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .field-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    letter-spacing: 0.01em;
  }

  .field-required {
    color: rgba(255, 255, 255, 0.65);
  }

  .field-helper {
    margin: 0;
    color: rgba(230, 236, 255, 0.7);
    font-weight: 600;
    font-size: 0.95rem;
  }

  :global(.field input),
  :global(.field textarea),
  :global(.field select) {
    padding: 0.65rem;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
    font-family: inherit;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  :global(.field textarea) {
    resize: vertical;
    min-height: 52px;
  }

  :global(.field input[type="checkbox"]),
  :global(.field input[type="radio"]) {
    width: auto;
    height: auto;
    padding: 0;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.25);
    accent-color: #d6e3ff;
  }
</style>

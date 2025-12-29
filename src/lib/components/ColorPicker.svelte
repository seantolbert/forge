<script lang="ts">
  export let value = "#5ee2a0";
  export let name = "color";
  export let label = "Choose color";
  export let disabled = false;
</script>

<label class="color-chip" style={`--chip-color: ${value}`}>
  <input
    type="color"
    {name}
    bind:value
    aria-label={label}
    {disabled}
  />
  <span class="chip-label">{value}</span>
</label>

<style lang="postcss">
  .color-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
    padding: 0.4rem 0.6rem;
    border-radius: 12px;
    cursor: pointer;
    color: #e6ecff;
    width: fit-content;
  }

  .color-chip input[type="color"] {
    width: 36px;
    height: 36px;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
  }

  .color-chip::before {
    content: "";
    width: 22px;
    height: 22px;
    border-radius: 8px;
    background: var(--chip-color, #5ee2a0);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .chip-label {
    font-weight: 700;
    font-size: 0.95rem;
  }
</style>

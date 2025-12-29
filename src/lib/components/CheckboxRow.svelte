<script lang="ts">
  export let gap = "0.65rem";
</script>

<div class="checkbox-row" style={`--checkbox-row-gap: ${gap}`}>
  <slot />
</div>

<style>
  .checkbox-row {
    display: flex;
    flex-direction: column;
    gap: var(--checkbox-row-gap, 0.65rem);
  }
</style>

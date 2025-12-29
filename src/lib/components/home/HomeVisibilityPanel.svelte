<script lang="ts">
  import { hiddenWidgets, hideWidget, unhideWidget } from "$lib/stores/hiddenWidgets";
  import type { CardId } from "$lib/data/home";

  export let widgets: { id: CardId; label: string }[] = [];
</script>

<div class="placeholder">
  <p class="eyebrow">Settings</p>
  <h2>Visibility</h2>
  <p class="lead">Toggle which widgets show on Home.</p>
  <div class="switches">
    {#each widgets as widget}
      <label class="switch-row">
        <span>Show {widget.label}</span>
        <input
          type="checkbox"
          checked={!$hiddenWidgets.includes(widget.id)}
          on:change={(e) =>
            e.currentTarget.checked ? unhideWidget(widget.id) : hideWidget(widget.id)}
        />
      </label>
    {/each}
  </div>
</div>

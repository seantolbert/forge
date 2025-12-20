<script lang="ts">
  let { label } = $props<{ label: string }>();
</script>

<span class="chip">{label}</span>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(232, 241, 230, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: #e8f1e6;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }
</style>

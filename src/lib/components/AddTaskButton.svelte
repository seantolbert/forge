<script lang="ts">
  import AddTaskSheet from "./AddTaskSheet.svelte";

  let open = false;
</script>

<div class="adder">
  <AddTaskSheet {open} onClose={() => (open = false)} />

  <button class="fab" type="button" on:click={() => (open = !open)} aria-label="Add task">
    +
  </button>
</div>

<style>
  .adder {
    position: fixed;
    bottom: 18px;
    right: 18px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .fab {
    height: 52px;
    width: 52px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    color: #0b1021;
    font-size: 1.8rem;
    font-weight: 900;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
</style>

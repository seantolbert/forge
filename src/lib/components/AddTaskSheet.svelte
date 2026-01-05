<script lang="ts">
  export let open = false;
  export let onClose: () => void;
  export let task: unknown = null;

  const handleClose = () => {
    onClose?.();
  };
</script>

<div class={`drawer-shell ${open ? "open" : ""}`} aria-hidden={!open}>
  <div class="overlay" on:click={handleClose}></div>
  <div class="drawer" role="dialog" aria-label="Task drawer">
    <button class="close-btn" aria-label="Close" type="button" on:click={handleClose}>X</button>
    <div class="content">
      <!-- Empty body; ready for future fields -->
    </div>
  </div>
</div>

<style>
  .drawer-shell {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .drawer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(820px, 100vw);
    background: #0f172a;
    color: #e6ecff;
    border-radius: 16px 0 0 16px;
    box-shadow: -26px 0 80px rgba(0, 0, 0, 0.5);
    padding: 1.5rem 1.25rem 2rem;
    opacity: 0;
    transform: translateX(100%);
    transition: transform 240ms ease, opacity 200ms ease;
    overflow-y: auto;
  }

  .drawer-shell.open {
    pointer-events: auto;
  }

  .drawer-shell.open .overlay {
    opacity: 1;
  }

  .drawer-shell.open .drawer {
    opacity: 1;
    transform: translateX(0);
  }

  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    color: #e6ecff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
  }

  .content {
    margin-top: 2.5rem;
    min-height: 40vh;
  }
</style>

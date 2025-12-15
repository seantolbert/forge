<script lang="ts">
  import { menuOpen, navMenuOpen, secondaryMenuOpen } from "$lib/stores/menu";
</script>

<main class="page">
  <section class="content">
    <h1>Orders</h1>
    <p>Manage orders here.</p>
    <p class="menu-status">Menu is currently {$menuOpen ? "open" : "closed"}.</p>
    <p class="menu-status">
      Secondary menu is currently {$secondaryMenuOpen ? "open" : "closed"}.
    </p>
    <p class="menu-status">Navigation menu is currently {$navMenuOpen ? "open" : "closed"}.</p>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      sans-serif;
  }

  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 40rem;
  }

  .menu-status {
    font-weight: 600;
  }
</style>

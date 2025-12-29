<script lang="ts">
  import { browser } from "$app/environment";
  import favicon from "$lib/assets/favicon.svg";
  import BottomNav from "$lib/components/BottomNav.svelte";
  import AddTaskButton from "$lib/components/AddTaskButton.svelte";
  import { onMount } from "svelte";
  import { registerSW } from "virtual:pwa-register";
  import "$lib/styles/fonts.css";
  let { children } = $props();

  onMount(() => {
    if (!browser) return;
    // Ensure the PWA service worker is registered in all environments.
    registerSW({ immediate: true }).catch((err) => console.error("SW registration failed", err));
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<BottomNav />
<AddTaskButton />

<style>
  :global(body) {
    margin: 0;
    padding-bottom: 88px; /* reserve space for bottom nav */
    background: #0b0f1a;
    color: #e8f1e6;
  }
</style>

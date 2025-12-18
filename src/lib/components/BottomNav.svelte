<script lang="ts">
  import { icons } from "$lib/assets/icons";
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";

  const navItems = [
    { href: "/", label: "Home", icon: icons.home },
    { href: "/orders", label: "Orders", icon: icons.orders },
    { href: "/calendar", label: "Calendar", icon: icons.calendar },
    { href: "/tasks", label: "Tasks", icon: icons.tasks },
    { href: "/settings", label: "Settings", icon: icons.settings },
  ];

  let linkRefs: HTMLAnchorElement[] = [];
  let indicator = { left: 5, width: 40 };

  const updateIndicator = async () => {
    await tick();
    const index = navItems.findIndex(
      (item) => item.href === $page.url.pathname
    );
    const el = linkRefs[index];
    if (!el) return;
    const next = { left: el.offsetLeft, width: el.offsetWidth };
    if (next.left !== indicator.left || next.width !== indicator.width) {
      indicator = next;
    }
  };

  onMount(updateIndicator);
  $: $page.url.pathname, updateIndicator();
</script>

<nav class="bottom-nav" aria-label="Primary navigation">
  <div
    class="nav-indicator"
    style={`transform: translateX(${indicator.left}px); width: ${indicator.width}px;`}
    aria-hidden="true"
  />
  {#each navItems as item, index}
    <a
      href={item.href}
      class={`nav-link ${$page.url.pathname === item.href ? "active" : ""}`}
      aria-current={$page.url.pathname === item.href ? "page" : undefined}
      bind:this={linkRefs[index]}
    >
      <span class="icon" aria-hidden="true">{@html item.icon}</span>
    </a>
  {/each}
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0f172a;
    color: #e8f1e6;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    padding: 5px;
    gap: 10px;
    z-index: 10;
    overflow: hidden;
  }

  .nav-indicator {
    position: absolute;
    left: 0;
    height: 50px;
    width: 50px;
    background: #9fbe86;
    border-radius: 50%;
    transition: transform 320ms cubic-bezier(0.33, 1, 0.68, 1);
    z-index: 1;
  }

  .nav-link {
    position: relative;
    z-index: 1;
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    height: 40px;
    width: 40px;
    padding: 5px;
    /* background: #0f172a; */
  }

  .nav-link.active {
    color: #070202;
  }

  .icon :global(svg) {
    width: 26px;
    height: 26px;
  }

  .icon :global(path),
  .icon :global(g),
  .icon :global(rect),
  .icon :global(circle) {
    fill: currentColor;
    stroke: currentColor;
  }
</style>

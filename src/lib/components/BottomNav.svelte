<script lang="ts">
  import { icons } from "$lib/assets/icons";
  import { onMount, tick } from "svelte";
  import { navFilter, type NavFilter } from "$lib/stores/navFilter";

  const navItems: { id: NavFilter; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: icons.home },
    { id: "orders", label: "Orders", icon: icons.orders },
    { id: "calendar", label: "Calendar", icon: icons.calendar },
    { id: "tasks", label: "Tasks", icon: icons.tasks },
    { id: "settings", label: "Settings", icon: icons.settings },
  ];

  let linkRefs: HTMLButtonElement[] = [];
  let indicator = { left: 5, width: 40 };
  let activeId: NavFilter = navItems[0].id;

  const updateIndicator = async () => {
    await tick();
    const index = navItems.findIndex((item) => item.id === activeId);
    const el = linkRefs[index];
    if (!el) return;
    const next = { left: el.offsetLeft, width: el.offsetWidth };
    if (next.left !== indicator.left || next.width !== indicator.width) {
      indicator = next;
    }
  };

  onMount(() => {
    updateIndicator();
    const unsubscribe = navFilter.subscribe((value) => {
      activeId = value ?? "home";
      updateIndicator();
    });
    return unsubscribe;
  });

  const handleSelect = (id: string) => {
    activeId = id as NavFilter;
    navFilter.set(activeId === "home" ? null : activeId);
    if (activeId === "home" && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    updateIndicator();
  };
</script>

<nav class="bottom-nav" aria-label="Primary navigation">
  <div
    class="nav-indicator"
    style={`transform: translateX(${indicator.left}px); width: ${indicator.width}px;`}
    aria-hidden="true"
  ></div>
  {#each navItems as item, index}
    <button
      type="button"
      class={`nav-link ${activeId === item.id ? "active" : ""}`}
      aria-pressed={activeId === item.id}
      bind:this={linkRefs[index]}
      on:click={() => handleSelect(item.id)}
    >
      <span class="icon" aria-hidden="true">{@html item.icon}</span>
      <!-- <span class="sr-only">{item.label}</span> -->
    </button>
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
    /* border-radius: 50%; */
    transition: transform 320ms cubic-bezier(0.33, 1, 0.68, 1);
    z-index: 1;
  }

  .nav-link {
    position: relative;
    z-index: 1;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    height: 40px;
    width: 40px;
    padding: 5px;
    background: transparent;
    border: none;
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

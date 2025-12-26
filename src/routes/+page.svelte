<script lang="ts">
  import SummaryPanel from "$lib/components/home/SummaryPanel.svelte";
  import RecommendationList from "$lib/components/home/RecommendationList.svelte";
  import TaskList from "$lib/components/home/TaskList.svelte";
  import CalendarMonth from "$lib/components/home/CalendarMonth.svelte";
  import OrdersList from "$lib/components/home/OrdersList.svelte";
  import { fade, fly } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import type {
    SummaryData,
    Recommendation,
  } from "$lib/components/home/types";
  import { navFilter } from "$lib/stores/navFilter";
  import { hiddenWidgets, hideWidget, unhideWidget, initHiddenWidgets } from "$lib/stores/hiddenWidgets";

  const CARD_SUMMARY = "summary";
  const CARD_TASKS = "tasks";
  const CARD_RECS = "recommendations";
  const CARD_CAL = "calendar";
  const CARD_ORDERS = "orders";
  const CARD_SETTINGS = "settings";

  let cardOrder = [CARD_SUMMARY, CARD_TASKS, CARD_RECS, CARD_CAL, CARD_ORDERS, CARD_SETTINGS];
  let draggingId: string | null = null;
  let filterId: string | null = null;
  let hiddenCards = new Set<string>();
  let menuOpen: Record<string, boolean> = {};

  const summary: SummaryData = {
    eyebrow: "Today",
    headline: "Your day is already 62% lighter",
    summary:
      "Meetings trimmed, focus blocks secured. You have space for deep work and a quick recharge. Take a short reset at 14:00-14:30 to keep momentum clean.",
  };

  const recommendations: Recommendation[] = [
    {
      title: "Signal Drift",
      type: "Podcast",
      length: "24 min",
      focus: "Clarity",
      accent: "var(--accent-amber)",
    },
    {
      title: "The Quiet Sprint",
      type: "Book",
      length: "3h read",
      focus: "Flow",
      accent: "var(--accent-ice)",
    },
    {
      title: "North Star Notes",
      type: "Podcast",
      length: "32 min",
      focus: "Strategy",
      accent: "var(--accent-rose)",
    },
    {
      title: "Daymaker Playbook",
      type: "Book",
      length: "2h read",
      focus: "Energy",
      accent: "var(--accent-mint)",
    },
  ];

  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth();
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const pad = (value: number) => String(value).padStart(2, "0");
  const todayKey = `${currentYear}-${pad(currentMonth + 1)}-${pad(todayDate.getDate())}`;
  const toDateKey = (day: number) =>
    `${currentYear}-${pad(currentMonth + 1)}-${pad(Math.min(Math.max(day, 1), daysInCurrentMonth))}`;
  let selectedDate = todayKey;

  const calendarEvents = [
    { date: toDateKey(todayDate.getDate()), label: "Today" },
    { date: toDateKey(todayDate.getDate()), label: "Budget review" },
    { date: toDateKey(todayDate.getDate()), label: "Ops sync" },
    { date: toDateKey(todayDate.getDate()), label: "UX handoff" },
    { date: toDateKey(todayDate.getDate()), label: "Client check-in" },
    { date: toDateKey(todayDate.getDate()), label: "Marketing retro" },
    { date: toDateKey(todayDate.getDate() + 2), label: "Workshop" },
    { date: toDateKey(todayDate.getDate() + 5), label: "Demo" },
    { date: toDateKey(8), label: "Ops review" },
    { date: toDateKey(15), label: "Release" }
  ];
  const formatDateLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("default", { month: "short", day: "numeric" });
  $: activeDate = selectedDate || todayKey;
  $: selectedEvents = calendarEvents.filter((event) => event.date.slice(0, 10) === activeDate);
  $: selectedDateLabel = formatDateLabel(activeDate);

  const orders = [
    {
      id: "o-1",
      title: "Handcrafted mug",
      note: "Buyer asked for gift wrap",
      source: "Etsy",
      createdAt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 1).toISOString(),
      stage: "processing",
      image: "https://images.unsplash.com/photo-1523419400521-211b4c577c17?auto=format&fit=crop&w=400&q=60"
    },
    {
      id: "o-2",
      title: "Vintage camera strap",
      note: "Ship with tracking",
      source: "eBay",
      createdAt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 3).toISOString(),
      stage: "shipped"
    },
    {
      id: "o-3",
      title: "Accent lamp",
      note: "Local pickup",
      source: "Facebook Marketplace",
      createdAt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7).toISOString(),
      stage: "packed",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=60"
    },
    {
      id: "o-4",
      title: "Custom poster",
      note: "Awaiting payment confirmation",
      source: "Shopify",
      createdAt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).toISOString(),
      stage: "new"
    }
  ];

  const swapCards = (sourceId: string, targetId: string) => {
    const next = cardOrder.filter((id) => id !== sourceId);
    const targetIndex = next.indexOf(targetId);
    if (targetIndex === -1) return;
    next.splice(targetIndex, 0, sourceId);
    cardOrder = next;
  };

  const handleDragStart = (id: string, event: DragEvent) => {
    draggingId = id;
    event.dataTransfer?.setData("text/plain", id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDrop = (targetId: string, event: DragEvent) => {
    event.preventDefault();
    if (draggingId && draggingId !== targetId) {
      swapCards(draggingId, targetId);
    }
    draggingId = null;
  };

  const handleDragEnd = () => {
    draggingId = null;
  };

  const toggleMenu = (id: string) => {
    menuOpen = { ...menuOpen, [id]: !menuOpen[id] };
  };

  const hideCard = (id: string) => {
    hideWidget(id);
    menuOpen = { ...menuOpen, [id]: false };
  };

  const unhideCard = (id: string) => {
    unhideWidget(id);
  };

  const closeMenu = (id: string) => {
    menuOpen = { ...menuOpen, [id]: false };
  };

  $: visibleCards = (filterId ? [filterId] : cardOrder).filter((id) => filterId === id || !hiddenCards.has(id));

  const unsubscribe = navFilter.subscribe((value) => {
    filterId = value;
  });

  const unsubscribeHidden = hiddenWidgets.subscribe((list) => {
    hiddenCards = new Set(list);
  });

  onMount(() => {
    initHiddenWidgets();
  });

  onDestroy(() => {
    unsubscribe();
    unsubscribeHidden();
  });
</script>

<main class="home">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>
  <div class="glow glow-c"></div>

  {#each visibleCards as cardId, index (cardId)}
    <section
      class={`card ${cardId === CARD_TASKS ? "task-card" : ""} ${index % 2 === 1 ? "glass" : ""} ${draggingId === cardId ? "dragging" : ""} ${filterId && cardId === filterId ? "solo" : ""}`}
      aria-label={`${cardId} panel`}
      on:dragover|preventDefault
      on:drop={(event) => handleDrop(cardId, event)}
      out:fly|local={{ y: 24, duration: 240, easing: (t) => t * t }}
      in:fly|local={{ y: -18, duration: 280, easing: (t) => t * t }}
    >
      {#if filterId !== cardId}
        <button class="icon-btn menu-btn" aria-label="Open widget menu" on:click={() => toggleMenu(cardId)}>
          ...
        </button>
      {/if}
      {#if menuOpen[cardId]}
        <div class="mini-menu">
          <button class="mini-btn" type="button" aria-label="Close menu" on:click={() => closeMenu(cardId)}>
            x
          </button>
          <button class="mini-btn" type="button" aria-label="Hide widget" on:click={() => hideCard(cardId)}>
            hide
          </button>
          <button class="mini-btn" type="button" aria-label="Plus action">
            +
          </button>
          <button class="mini-btn" type="button" aria-label="Minus action">
            -
          </button>
        </div>
      {/if}
      <button
        class="icon-btn move-btn"
        aria-label={`Move ${cardId} card`}
        draggable="true"
        on:dragstart={(event) => handleDragStart(cardId, event)}
        on:dragend={handleDragEnd}
      >
        ::
      </button>

      {#if cardId === CARD_SUMMARY}
        <SummaryPanel data={summary} />
      {:else if cardId === CARD_TASKS}
        <TaskList limit={filterId === CARD_TASKS ? null : 3} />
      {:else if cardId === CARD_RECS}
        <RecommendationList items={recommendations} />
      {:else if cardId === CARD_CAL}
        <CalendarMonth events={calendarEvents} bind:selectedDate />
        {#if filterId === CARD_CAL}
          <div class="event-list">
            <p class="event-label">Events for {selectedDateLabel}</p>
            {#if selectedEvents.length}
              {#each selectedEvents as event (event.date + event.label)}
                <div class="event-row">
                  <span class="dot"></span>
                  <span class="event-title">{event.label || "Untitled event"}</span>
                  <span class="event-date">{event.date}</span>
                </div>
              {/each}
            {:else}
              <p class="muted">No events this day</p>
            {/if}
          </div>
        {/if}
      {:else if cardId === CARD_ORDERS}
        <OrdersList orders={orders} />
      {:else if cardId === CARD_SETTINGS}
        <div class="placeholder">
          <p class="eyebrow">Settings</p>
          <h2>Visibility</h2>
          <p class="lead">Toggle which widgets show on Home.</p>
          <div class="switches">
            {#each [
              { id: CARD_SUMMARY, label: "Summary" },
              { id: CARD_TASKS, label: "Tasks" },
              { id: CARD_RECS, label: "Recommendations" },
              { id: CARD_CAL, label: "Calendar" },
              { id: CARD_ORDERS, label: "Orders" },
              { id: CARD_SETTINGS, label: "Settings" }
            ] as widget}
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
      {/if}
    </section>
    {#if filterId === cardId && hiddenCards.has(cardId)}
      <div class="unhide-row">
        <span>Currently hidden</span>
        <button class="soft-button ghost" type="button" on:click={() => unhideCard(cardId)}>Unhide</button>
      </div>
    {/if}
  {/each}

</main>

<style>
  :global(body) {
    background: radial-gradient(
        110% 80% at 10% 10%,
        rgba(255, 255, 255, 0.18),
        transparent 35%
      ),
      radial-gradient(
        80% 70% at 90% 0%,
        rgba(88, 156, 255, 0.14),
        transparent 30%
      ),
      linear-gradient(145deg, #05060d 0%, #0a0d1a 60%, #06080f 100%);
    color: #e6ecff;
    font-family:
      "SF Pro Display",
      "SF Pro Text",
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    min-height: 100vh;
  }

  :global(:root) {
    --glass: rgba(255, 255, 255, 0.08);
    --border: rgba(255, 255, 255, 0.14);
    --text-dim: rgba(230, 236, 255, 0.7);
    --accent-amber: linear-gradient(120deg, #ffce73, #ff8a3d);
    --accent-ice: linear-gradient(120deg, #b9d5ff, #6fc8ff);
    --accent-rose: linear-gradient(120deg, #ff90c2, #ff5e8a);
    --accent-mint: linear-gradient(120deg, #b6ffda, #5ee2a0);
  }

  .home {
    position: relative;
    min-height: 100vh;
    padding: 1.5rem 1.25rem 2.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .glow {
    position: absolute;
    filter: blur(60px);
    opacity: 0.7;
    z-index: 0;
    pointer-events: none;
  }

  .glow-a {
    width: 40vw;
    height: 40vw;
    top: -6rem;
    left: -8rem;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.18),
      transparent 60%
    );
  }

  .glow-b {
    width: 50vw;
    height: 50vw;
    bottom: -10rem;
    right: -12rem;
    background: radial-gradient(
      circle,
      rgba(110, 184, 255, 0.25),
      transparent 65%
    );
  }

  .glow-c {
    width: 30vw;
    height: 30vw;
    top: 20%;
    right: -6rem;
    background: radial-gradient(
      circle,
      rgba(255, 144, 194, 0.18),
      transparent 60%
    );
  }

  :global(.glass) {
    position: relative;
    background: var(--glass);
    /* border: 1px solid var(--border); */
    border-radius: 22px;
    /* box-shadow: */
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    overflow: hidden;
    z-index: 1;
  }

  :global(.soft-button) {
    border: none;
    outline: none;
    border-radius: 14px;
    padding: 0.55rem 0.9rem;
    /* background: linear-gradient(120deg, #f4f7ff, #d6e3ff); */
    color: #0b1021;
    font-weight: 700;
    box-shadow: 0 14px 26px rgba(214, 227, 255, 0.35);
    cursor: pointer;
  }

  :global(.soft-button.ghost) {
    /* background: rgba(255, 255, 255, 0.08); */
    color: #e6ecff;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  :global(.soft-button.tiny) {
    padding: 0.45rem 0.85rem;
    /* background: rgba(255, 255, 255, 0.12); */
    color: #f5f7ff;
    box-shadow: none;
  }

  :global(.eyebrow) {
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin: 0;
  }

  .card {
    padding: 1.2rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    position: relative;
    min-height: 32vh;
    transition:
      transform 240ms ease,
      min-height 260ms ease,
      padding 220ms ease;
  }

  .card.solo {
    min-height: calc(100vh - 3.5rem);
    padding: 1.4rem 1.1rem;
    transform: translateY(-12px);
  }

  .task-card {
    min-height: auto;
  }

  .task-card.solo {
    min-height: auto;
    padding: 1.1rem 0.85rem;
    transform: translateY(-8px);
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .placeholder h2 {
    margin: 0;
    font-size: 1.3rem;
  }

  .lead {
    margin: 0;
    color: rgba(230, 236, 255, 0.75);
  }

  .skeleton-row {
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
    animation: shimmer 1.6s infinite;
  }

  .skeleton-row.short {
    width: 60%;
  }

  .switches {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    gap: 1rem;
  }

  .switch-row input[type="checkbox"] {
    width: 42px;
    height: 24px;
    accent-color: #9ac8ff;
  }

  @keyframes shimmer {
    0% {
      background-position: -120px 0;
    }
    100% {
      background-position: 120px 0;
    }
  }


  .icon-btn {
    position: absolute;
    top: 0.65rem;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: rgba(230, 236, 255, 0.8);
    display: grid;
    place-items: center;
    box-shadow: none;
    cursor: pointer;
  }

  .icon-btn.move-btn {
    font-weight: 800;
    letter-spacing: 0.08em;
    right: 0.65rem;
  }

  .icon-btn.menu-btn {
    right: 3.2rem;
    font-weight: 800;
  }

  .mini-menu {
    position: absolute;
    top: 0.5rem;
    right: 3.1rem;
    display: flex;
    gap: 0.4rem;
    padding: 0.3rem 0.45rem;
    border-radius: 12px;
    background: rgba(6, 8, 15, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .mini-btn {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
    color: #e6ecff;
    border-radius: 8px;
    padding: 0.25rem 0.5rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
  }

  .unhide-row {
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }

  .event-list {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .event-label {
    margin: 0;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.65);
  }

  .event-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.35rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  .event-row .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
    box-shadow: 0 0 0 3px rgba(214, 227, 255, 0.2);
  }

  .event-title {
    font-weight: 700;
  }

  .event-date {
    margin-left: auto;
    color: rgba(230, 236, 255, 0.65);
    font-size: 0.95rem;
  }

  .card.dragging {
    opacity: 0.82;
    outline: 1px dashed rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 640px) {
    .home {
      padding: 2rem 1.75rem 3rem;
    }

    .card {
      padding: 1.6rem 1.3rem 1.35rem;
      min-height: 36vh;
    }
  }
  </style>

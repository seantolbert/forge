<script lang="ts">
  // Home page cards and panels.
  import SummaryPanel from "$lib/components/home/SummaryPanel.svelte";
  import RecommendationList from "$lib/components/home/RecommendationList.svelte";
  import TaskList from "$lib/components/home/TaskList.svelte";
  import CalendarMonth from "$lib/components/home/CalendarMonth.svelte";
  import CalendarEvents from "$lib/components/home/CalendarEvents.svelte";
  import OrdersList from "$lib/components/home/OrdersList.svelte";
  import CardShell from "$lib/components/home/CardShell.svelte";
  import HomeVisibilityPanel from "$lib/components/home/HomeVisibilityPanel.svelte";
  import {
    calendarEvents,
    CARD_IDS,
    type CardId,
    defaultCardOrder,
    orders,
    recommendations,
    summary,
    todayKey,
    widgetList,
  } from "$lib/data/home";
  import { onDestroy, onMount } from "svelte";
  import { navFilter } from "$lib/stores/navFilter";
  import { hiddenWidgets, hideWidget, unhideWidget, initHiddenWidgets } from "$lib/stores/hiddenWidgets";

  import "$lib/styles/home.css";

  // UI state for card layout, filtering, and menus.
  let cardOrder: CardId[] = [...defaultCardOrder];
  let draggingId: CardId | null = null;
  let filterId: CardId | null = null;
  let hiddenCards = new Set<CardId>();
  let menuOpen: Partial<Record<CardId, boolean>> = {};
  const {
    summary: CARD_SUMMARY,
    tasks: CARD_TASKS,
    recommendations: CARD_RECS,
    calendar: CARD_CAL,
    orders: CARD_ORDERS,
    settings: CARD_SETTINGS,
  } = CARD_IDS;

  // Calendar selection.
  let selectedDate = todayKey;

  const formatDateLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("default", { month: "short", day: "numeric" });
  $: activeDate = selectedDate || todayKey;
  $: selectedEvents = calendarEvents.filter((event) => event.date.slice(0, 10) === activeDate);
  $: selectedDateLabel = formatDateLabel(activeDate);

  // Swap two card positions in the layout order.
  const swapCards = (sourceId: CardId, targetId: CardId) => {
    const next = cardOrder.filter((id) => id !== sourceId);
    const targetIndex = next.indexOf(targetId);
    if (targetIndex === -1) return;
    next.splice(targetIndex, 0, sourceId);
    cardOrder = next;
  };

  // Drag handlers for card reordering.
  const handleDragStart = (id: CardId, event: DragEvent) => {
    draggingId = id;
    event.dataTransfer?.setData("text/plain", id);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDrop = (targetId: CardId, event: DragEvent) => {
    event.preventDefault();
    if (draggingId && draggingId !== targetId) {
      swapCards(draggingId, targetId);
    }
    draggingId = null;
  };

  const handleDragEnd = () => {
    draggingId = null;
  };

  // Card menu helpers (show/hide actions).
  const toggleMenu = (id: CardId) => {
    menuOpen = { ...menuOpen, [id]: !menuOpen[id] };
  };

  const hideCard = (id: CardId) => {
    hideWidget(id);
    menuOpen = { ...menuOpen, [id]: false };
  };

  const unhideCard = (id: CardId) => {
    unhideWidget(id);
  };

  const closeMenu = (id: CardId) => {
    menuOpen = { ...menuOpen, [id]: false };
  };

  // Reactive list of cards to render based on filter and hidden state.
  $: visibleCards = (filterId ? [filterId] : cardOrder).filter((id) => filterId === id || !hiddenCards.has(id));

  // Sync navbar filter store into local filter state.
  const unsubscribe = navFilter.subscribe((value) => {
    filterId = value && Object.values(CARD_IDS).includes(value as CardId) ? (value as CardId) : null;
  });

  const unsubscribeHidden = hiddenWidgets.subscribe((list) => {
    hiddenCards = new Set(list as CardId[]);
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
    <CardShell
      id={cardId}
      isTaskCard={cardId === CARD_TASKS}
      isGlass={index % 2 === 1}
      isSolo={Boolean(filterId && cardId === filterId)}
      isDragging={draggingId === cardId}
      isFiltered={filterId === cardId}
      isHidden={hiddenCards.has(cardId)}
      menuOpen={Boolean(menuOpen[cardId])}
      on:drop={(event) => handleDrop(cardId, event.detail.event)}
      on:dragstart={(event) => handleDragStart(cardId, event.detail.event)}
      on:dragend={handleDragEnd}
      on:toggleMenu={() => toggleMenu(cardId)}
      on:closeMenu={() => closeMenu(cardId)}
      on:hide={() => hideCard(cardId)}
      on:unhide={() => unhideCard(cardId)}
    >
      {#if cardId === CARD_SUMMARY}
        <SummaryPanel data={summary} />
      {:else if cardId === CARD_TASKS}
        <TaskList limit={filterId === CARD_TASKS ? null : 3} />
      {:else if cardId === CARD_RECS}
        <RecommendationList items={recommendations} />
      {:else if cardId === CARD_CAL}
        <CalendarMonth events={calendarEvents} bind:selectedDate />
        {#if filterId === CARD_CAL}
          <CalendarEvents events={selectedEvents} dateLabel={selectedDateLabel} />
        {/if}
      {:else if cardId === CARD_ORDERS}
        <OrdersList orders={orders} />
      {:else if cardId === CARD_SETTINGS}
        <HomeVisibilityPanel widgets={widgetList} />
      {/if}
    </CardShell>
  {/each}

</main>

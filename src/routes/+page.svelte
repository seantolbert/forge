<script lang="ts">
  import SummaryPanel, {
    type SummaryData,
  } from "$lib/components/home/SummaryPanel.svelte";
  import RecommendationList, {
    type Recommendation,
  } from "$lib/components/home/RecommendationList.svelte";
  import TaskList, { type Task } from "$lib/components/home/TaskList.svelte";

  const CARD_SUMMARY = "summary";
  const CARD_TASKS = "tasks";
  const CARD_RECS = "recommendations";

  let cardOrder = [CARD_SUMMARY, CARD_TASKS, CARD_RECS];
  let draggingId: string | null = null;

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

  const tasks: Task[] = [
    { title: "Send recap to design", status: "ready", due: "11:30" },
    { title: "Finalize Q3 priorities", status: "in-progress", due: "14:00" },
    { title: "Schedule sync with ops", status: "blocked", due: "16:00" },
    { title: "Review draft roadmap", status: "ready", due: "Today" },
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
</script>

<main class="home">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>
  <div class="glow glow-c"></div>

  {#each cardOrder as cardId (cardId)}
    <section
      class={`card glass ${draggingId === cardId ? "dragging" : ""}`}
      on:dragover|preventDefault
      on:drop={(event) => handleDrop(cardId, event)}
    >
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
        <TaskList {tasks} />
      {:else if cardId === CARD_RECS}
        <RecommendationList items={recommendations} />
      {/if}
    </section>
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
  }

  .icon-btn {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    /* border: 1px solid rgba(255, 255, 255, 0.12); */
    /* background: rgba(255, 255, 255, 0.06); */
    color: #e6ecff;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .icon-btn.move-btn {
    font-weight: 800;
    letter-spacing: 0.08em;
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

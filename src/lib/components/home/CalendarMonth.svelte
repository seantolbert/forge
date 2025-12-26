<script lang="ts">
  export type CalendarEvent = { date: string; label?: string };

  export let events: CalendarEvent[] = [];
  export let selectedDate: string | null = null;

  const toISODate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const todayKey = toISODate(year, month, today.getDate());
  const monthLabel = today.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay(); // 0 = Sunday

  const toMap = (list: CalendarEvent[]) => {
    const map = new Map<string, CalendarEvent[]>();
    list.forEach((event) => {
      const key = normalizeDate(event.date);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(event);
    });
    return map;
  };

  const normalizeDate = (date: string) => date.slice(0, 10);

  let eventMap = toMap(events);
  $: activeDate = selectedDate || todayKey;
  $: eventMap = toMap(events);

  $: days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateKey = toISODate(year, month, day);
    return {
      day,
      dateKey,
      hasEvent: eventMap.has(dateKey),
      isToday: dateKey === todayKey,
      isSelected: dateKey === activeDate,
    };
  });

  $: gridCells = [...Array.from({ length: startOffset }, () => null), ...days];
</script>

<div class="calendar">
  <div class="calendar-header">
    <div>
      <p class="eyebrow">Calendar</p>
      <h3>{monthLabel}</h3>
    </div>
    <p class="muted">
      {events.length}
      {events.length === 1 ? "event" : "events"}
    </p>
  </div>

  <div class="day-labels">
    {#each dayLabels as label}
      <span>{label}</span>
    {/each}
  </div>

  <div class="grid">
    {#each gridCells as cell, index (cell ? cell.dateKey : `empty-${index}`)}
      {#if cell}
        <button
          type="button"
          class={`day ${cell.isToday ? "today" : ""} ${cell.hasEvent ? "has-event" : "no-event"} ${cell.isSelected ? "selected" : ""}`}
          aria-label={`${
            cell.hasEvent ? "Has events on" : "No events on"
          } ${monthLabel} ${cell.day}`}
          aria-pressed={cell.isSelected}
          on:click={() => (selectedDate = cell.dateKey)}
        >
          <span class="day-number">{cell.day}</span>
          <span class="dot" aria-hidden="true"></span>
        </button>
      {:else}
        <div class="day empty" aria-hidden="true"></div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .calendar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .calendar-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .calendar-header h3 {
    margin: 0.1rem 0 0;
    font-size: 1.3rem;
  }

  .day-labels {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.7);
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    text-align: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.35rem;
  }

  .day {
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: #e6ecff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    font-weight: 700;
  }

  .day-number {
    font-size: 1rem;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    display: inline-flex;
  }

  .day.has-event .dot {
    background: linear-gradient(120deg, #f4f7ff, #d6e3ff);
  }

  .day.no-event .dot {
    opacity: 0.4;
  }

  .day.today {
    background: rgba(255, 255, 255, 0.08);
  }

  .day.selected {
    border-color: rgba(214, 227, 255, 0.8);
    box-shadow: 0 0 0 2px rgba(214, 227, 255, 0.25);
  }

  .muted {
    margin: 0;
    color: rgba(230, 236, 255, 0.65);
  }

  @media (min-width: 640px) {
    .calendar-header h3 {
      font-size: 1.4rem;
    }
  }
</style>

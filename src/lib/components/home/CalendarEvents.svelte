<script lang="ts">
  import type { CalendarEvent } from "$lib/data/home";

  export let events: CalendarEvent[] = [];
  export let dateLabel: string;
</script>

<div class="event-list">
  <p class="event-label">Events for {dateLabel}</p>
  {#if events.length}
    {#each events as event (event.date + event.label)}
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

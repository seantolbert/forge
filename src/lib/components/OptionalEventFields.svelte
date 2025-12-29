<script lang="ts">
  import Field from "./Field.svelte";
  import CheckboxRow from "./CheckboxRow.svelte";

  export type InlineEvent = {
    title: string;
    start: string;
    end: string;
    location: string;
    description: string;
  };

  export let createEvent = false;
  export let inlineEvent: InlineEvent;
</script>

<CheckboxRow>
  <Field inline>
    <input name="createEvent" type="checkbox" bind:checked={createEvent} />
    <span>Create event</span>
  </Field>
</CheckboxRow>

{#if createEvent}
  <div class="sheet-grid">
    <Field label="Event title">
      <input name="eventTitle" placeholder="Fulfillment slot" bind:value={inlineEvent.title} />
    </Field>
    <Field label="Event location">
      <input name="eventLocation" placeholder="Shop, warehouse, remote" bind:value={inlineEvent.location} />
    </Field>
  </div>
  <div class="sheet-grid">
    <Field label="Event start date / time">
      <input name="eventStart" type="datetime-local" bind:value={inlineEvent.start} />
    </Field>
    <Field label="Event end date / time">
      <input name="eventEnd" type="datetime-local" bind:value={inlineEvent.end} />
    </Field>
  </div>
  <Field label="Event description">
    <textarea
      name="eventDescription"
      placeholder="Details, attendees, links"
      bind:value={inlineEvent.description}
      rows="3"
    ></textarea>
  </Field>
{/if}

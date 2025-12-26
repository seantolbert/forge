<script lang="ts">
  type OrderStage = "new" | "processing" | "packed" | "shipped" | "delivered" | "canceled";

  export type OrderItem = {
    id: string;
    title: string;
    note?: string;
    source: string;
    createdAt: string;
    stage: OrderStage;
    image?: string;
  };

  export let orders: OrderItem[] = [];

  const stageLabels: Record<OrderStage, string> = {
    new: "New",
    processing: "Processing",
    packed: "Packed",
    shipped: "Shipped",
    delivered: "Delivered",
    canceled: "Canceled",
  };

  const daysSince = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days <= 0 ? "Today" : `${days}d`;
  };

  const initials = (text: string) => text.trim().charAt(0).toUpperCase();
</script>

<div class="orders">
  {#each orders as order (order.id)}
    <article class="order">
      {#if order.image}
        <img class="thumb" src={order.image} alt={order.title} loading="lazy" />
      {:else}
        <div class="thumb placeholder" aria-hidden="true">{initials(order.title)}</div>
      {/if}
      <div class="meta">
        <div class="row">
          <p class="title">{order.title}</p>
          <span class={`stage ${order.stage}`}>{stageLabels[order.stage]}</span>
        </div>
        <p class="note">{order.note || "No notes yet"}</p>
        <div class="sub">
          <span class="source">{order.source}</span>
          <span class="spacer">•</span>
          <span>{daysSince(order.createdAt)} ago</span>
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
  .orders {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .order {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    padding: 0.65rem 0.55rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .thumb {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    object-fit: cover;
    background: rgba(255, 255, 255, 0.05);
  }

  .thumb.placeholder {
    display: grid;
    place-items: center;
    color: #0b1021;
    font-weight: 800;
    background: linear-gradient(140deg, #f4f7ff, #d6e3ff);
    text-transform: uppercase;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .title {
    margin: 0;
    font-weight: 800;
    color: #e6ecff;
  }

  .note {
    margin: 0;
    color: rgba(230, 236, 255, 0.75);
  }

  .sub {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: rgba(230, 236, 255, 0.65);
    font-size: 0.95rem;
  }

  .source {
    padding: 0.08rem 0.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .stage {
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e6ecff;
    background: rgba(255, 255, 255, 0.05);
  }

  .stage.processing,
  .stage.packed {
    background: rgba(255, 206, 115, 0.14);
    border-color: rgba(255, 206, 115, 0.4);
    color: #ffd9a1;
  }

  .stage.shipped {
    background: rgba(110, 184, 255, 0.16);
    border-color: rgba(110, 184, 255, 0.4);
    color: #cbe3ff;
  }

  .stage.delivered {
    background: rgba(182, 255, 218, 0.14);
    border-color: rgba(182, 255, 218, 0.45);
    color: #b6ffda;
  }

  .stage.new {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.25);
    color: #e6ecff;
  }

  .stage.canceled {
    background: rgba(255, 144, 194, 0.12);
    border-color: rgba(255, 144, 194, 0.4);
    color: #ffb8d7;
  }

  @media (min-width: 640px) {
    .order {
      padding: 0.75rem 0.65rem;
    }
  }
</style>

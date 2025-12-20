<script lang="ts">
  let { src = "", alt = "Avatar", size = 56 } = $props<{
    src?: string;
    alt?: string;
    size?: number;
  }>();
</script>

<div
  class="avatar"
  style={`--avatar-size: ${size}px;`}
  aria-hidden={src ? undefined : "true"}
>
  {#if src}
    <img src={src} alt={alt} />
  {:else}
    <span aria-hidden="true">{alt?.[0] ?? "A"}</span>
  {/if}
</div>

<style>
  :global(:root) {
    /* no globals added; placeholder to keep scope strict */
  }

  .avatar {
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #24324f, #1a2337);
    display: grid;
    place-items: center;
    color: #e8f1e6;
    font-weight: 700;
    border: 1px solid rgba(232, 241, 230, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 1rem;
  }
</style>

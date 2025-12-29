<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  type PermissionState = "checking" | "prompt" | "granted" | "denied" | "unsupported";

  let permission: PermissionState = "checking";
  let error = "";
  let platformHint = "";

  const refreshPermission = () => {
    if (!browser || typeof Notification === "undefined") {
      permission = "unsupported";
      return;
    }
    const current = Notification.permission;
    permission = current === "default" ? "prompt" : (current as PermissionState);
  };

  const detectPlatformHint = () => {
    if (!browser) return;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      platformHint = "On iOS, open Settings → Notifications → this app, then allow alerts/badges.";
    } else if (ua.includes("android")) {
      platformHint = "On Android, open site settings → Notifications and allow this PWA.";
    }
  };

  onMount(() => {
    refreshPermission();
    detectPlatformHint();
  });

  const requestPermission = async () => {
    if (!browser || typeof Notification === "undefined") {
      permission = "unsupported";
      return;
    }
    error = "";
    try {
      const result = await Notification.requestPermission();
      permission = result === "default" ? "prompt" : (result as PermissionState);
    } catch (err) {
      console.error("Failed to request notifications", err);
      error = "Unable to request notifications. Please try again.";
      permission = "prompt";
    }
  };
</script>

{#if permission === "prompt" || permission === "denied"}
  <section class="notify-card glass" aria-live="polite">
    <div class="copy">
      <p class="eyebrow">Stay updated</p>
      <h2>Allow push notifications</h2>
      <p class="muted">
        Get reminders for tasks and updates even when the app is closed.
      </p>
      {#if permission === "denied"}
        <p class="muted">
          Notifications are currently blocked. Use the browser/app notification settings to allow alerts, then tap
          below to retry.
        </p>
        {#if platformHint}
          <p class="muted">{platformHint}</p>
        {/if}
      {/if}
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </div>
    <div class="actions">
      <button class="soft-button" type="button" on:click={requestPermission}>Enable alerts</button>
    </div>
  </section>
{/if}

<style>
  .notify-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
    position: relative;
    z-index: 1;
  }

  .muted {
    margin: 0.2rem 0 0;
    color: rgba(230, 236, 255, 0.72);
  }

  h2 {
    margin: 0.15rem 0 0;
    font-size: 1.2rem;
  }

  .copy {
    flex: 1;
    min-width: 0;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .error {
    margin: 0.35rem 0 0;
    color: #ff90c2;
    font-weight: 700;
  }

  @media (max-width: 540px) {
    .notify-card {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions {
      width: 100%;
    }

    .actions .soft-button {
      width: 100%;
      text-align: center;
    }
  }
</style>

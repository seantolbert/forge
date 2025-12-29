<script lang="ts">
  import { browser } from "$app/environment";
  import { hiddenWidgets, hideWidget, unhideWidget } from "$lib/stores/hiddenWidgets";
  import type { CardId } from "$lib/data/home";

  export let widgets: { id: CardId; label: string }[] = [];

  let testStatus = "";
  let testError = "";

  const sendTestNotification = async () => {
    testStatus = "";
    testError = "";

    if (!browser || typeof Notification === "undefined") {
      testError = "Notifications are not supported on this device.";
      return;
    }

    try {
      let perm = Notification.permission;
      if (perm === "default") {
        perm = await Notification.requestPermission();
      }
      if (perm !== "granted") {
        testError = "Notifications are blocked. Enable them in settings, then try again.";
        return;
      }

      const title = "Test reminder";
      const body = "This is a simulated push notification from the app settings.";

      // Prefer the service worker to mimic real push delivery.
      const registration = await navigator.serviceWorker?.ready;
      if (registration?.showNotification) {
        await registration.showNotification(title, {
          body,
          icon: "/icons/pwa-192.png",
          badge: "/icons/pwa-192.png",
          tag: "test-push"
        });
      } else {
        // Fallback to a direct Notification API call.
        new Notification(title, { body });
      }

      testStatus = "Test notification sent. Check your notification shade.";
    } catch (err) {
      console.error("Failed to send test notification", err);
      testError = "Unable to send a test notification right now.";
    }
  };
</script>

<div class="placeholder">
  <p class="eyebrow">Settings</p>
  <h2>Visibility</h2>
  <p class="lead">Toggle which widgets show on Home.</p>
  <div class="switches">
    {#each widgets as widget}
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

  <div class="sheet-group">
    <p class="group-label">Notifications</p>
    <p class="muted">Send yourself a test notification to confirm permissions.</p>
    <button class="soft-button ghost" type="button" on:click={sendTestNotification}>Send test notification</button>
    {#if testStatus}
      <p class="success">{testStatus}</p>
    {/if}
    {#if testError}
      <p class="error">{testError}</p>
    {/if}
  </div>
</div>

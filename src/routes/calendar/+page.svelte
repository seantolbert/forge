<main class="page">
  <section class="widget">
    <p class="eyebrow">Calendar</p>
    <h1>Timeline placeholder</h1>
    <p class="lead">Drop your schedule, meetings, and focus blocks here.</p>
    <div class="skeleton-row"></div>
    <div class="skeleton-row short"></div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(145deg, #05060d 0%, #0a0d1a 60%, #06080f 100%);
    color: #e6ecff;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
  }

  .widget {
    width: 100%;
    max-width: 480px;
    padding: 1.4rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .eyebrow {
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(230, 236, 255, 0.7);
    margin: 0;
    font-size: 0.9rem;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
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

  @keyframes shimmer {
    0% {
      background-position: -120px 0;
    }
    100% {
      background-position: 120px 0;
    }
  }
</style>

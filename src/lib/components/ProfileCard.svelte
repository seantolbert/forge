<article class="card">
  <div class="avatar" aria-hidden="true"></div>

  <div class="text">
    <h2>Jamie Rivera</h2>
    <p>Product Lead</p>
  </div>

  <div class="sources" aria-label="Source">
    <span class="label">Source</span>
    <div class="chips">
      <span class="chip">LinkedIn</span>
      <span class="chip">Email</span>
    </div>
  </div>

  <div class="status" aria-label="Hot Client">
    <span class="status-label">Hot Client</span>
    <div class="dots" aria-hidden="true">
      <span class="dot on"></span>
      <span class="dot on"></span>
      <span class="dot on"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>

  <button class="corner-btn" type="button" aria-label="Open profile">⋯</button>
</article>

<style>
  .card {
    /* Core sizing variables to keep button/mask in sync */
    --r: 22px;
    --corner-btn: calc(var(--r) * 2);
    --cutout-pad: 10px;
    --card-radius: 18px;
    --card-bg: linear-gradient(135deg, #151c2b, #0f172a);

    position: relative;
    overflow: visible; /* allow button to protrude */
    padding: 16px;
    border-radius: var(--card-radius);
    background: var(--card-bg);
    border: 1px solid rgba(232, 241, 230, 0.12);
    color: #e8f1e6;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
    display: grid;
    gap: 12px;

    /* Mask math: hole center matches button center even though it protrudes */
    --cx: calc(100% + var(--cutout-pad) + var(--r));
    --cy: calc(0% - var(--cutout-pad) + var(--r));
    -webkit-mask: radial-gradient(
      circle var(--r) at var(--cx) var(--cy),
      transparent 99%,
      #000 100%
    );
    mask: radial-gradient(circle var(--r) at var(--cx) var(--cy), transparent 99%, #000 100%);
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #24324f, #1a2337);
    border: 1px solid rgba(232, 241, 230, 0.15);
  }

  .text h2 {
    margin: 0;
    font-size: 1.05rem;
    letter-spacing: 0.01em;
  }

  .text p {
    margin: 4px 0 0;
    color: rgba(232, 241, 230, 0.75);
    font-size: 0.95rem;
  }

  .sources {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .label {
    font-weight: 700;
    font-size: 0.9rem;
    color: rgba(232, 241, 230, 0.8);
  }

  .chips {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(232, 241, 230, 0.2);
    background: rgba(255, 255, 255, 0.05);
    font-size: 0.85rem;
    font-weight: 600;
    color: #e8f1e6;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .status-label {
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .dots {
    display: inline-flex;
    gap: 4px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .dot.on {
    background: radial-gradient(circle at 30% 30%, #ffdda5, #ff7b45);
    box-shadow: 0 0 6px rgba(255, 123, 69, 0.7);
  }

  .corner-btn {
    position: absolute;
    top: calc(var(--cutout-pad) * -1);
    right: calc(var(--cutout-pad) * -1);
    width: var(--corner-btn);
    height: var(--corner-btn);
    border-radius: 999px;
    border: 1px solid rgba(232, 241, 230, 0.2);
    background: #9fbe86;
    color: #0b0f1a;
    font-size: 1.3rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    cursor: pointer;
    z-index: 2;
    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.3),
      0 0 0 4px rgba(159, 190, 134, 0.25);
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      background 140ms ease;
  }

  .corner-btn:hover {
    background: #b3d39b;
    transform: translateY(-2px);
  }

  .corner-btn:active {
    transform: translateY(1px) scale(0.98);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.35),
      0 0 0 4px rgba(159, 190, 134, 0.35);
  }

  .corner-btn:focus-visible {
    outline: 2px solid #b3d39b;
    outline-offset: 3px;
  }
</style>

/**
 * Verifies scroll behaviour across client-side navigation.
 *
 * Lenis owns the scroll position and has no idea the router moved, so without
 * the reset in SmoothScroll.tsx a client-side navigation opens the next page
 * still scrolled to wherever the previous one sat. That bug is invisible to
 * tsc, to eslint, and to the build: it only exists once a second route does.
 *
 * Usage:
 *   npm run build && npx next start -p 3100 &
 *   node scripts/verify-scroll.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const TOP = 50; // px tolerance for "at the top"
const MOVED = 200; // px past which we consider the page genuinely scrolled

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass });
  console.log(`  ${pass ? "PASS" : "FAIL"}  ${name}${detail ? `\n         ${detail}` : ""}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const y = () => page.evaluate(() => Math.round(window.scrollY));

/** Real wheel events, so Lenis handles them the way a user's would. */
async function scrollDown(px) {
  await page.mouse.wheel(0, px);
  await page
    .waitForFunction((m) => window.scrollY > m, MOVED, { timeout: 5000 })
    .catch(() => {});
  await page.waitForTimeout(900); // let Lenis settle
}

try {
  // 1. Scrolled deep into home, then navigate away. Must open at the top.
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await scrollDown(3000);
  const homeBefore = await y();
  await page.getByRole("link", { name: "Wellness Core", exact: true }).first().click();
  await page.waitForURL("**/wellness-core");
  await page.waitForTimeout(1200);
  const afterNav = await y();
  check(
    "home (scrolled) -> /wellness-core opens at top",
    homeBefore > MOVED && afterNav < TOP,
    `left home at ${homeBefore}px, arrived at ${afterNav}px`,
  );

  // 2. The hash guard: a cross-page link with a fragment must honour it.
  await page.goto(`${BASE}/wellness-core`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Begin", exact: true }).first().click();
  await page.waitForURL("**/#contact");
  await page.waitForTimeout(1500);
  const atContact = await y();
  check(
    "/wellness-core -> Begin honours #contact instead of resetting",
    atContact > MOVED,
    `scrollY ${atContact}px`,
  );

  // 3. First render is skipped, so a deep link with a hash still lands.
  await page.goto(`${BASE}/wellness-core#modalities`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const atAnchor = await y();
  check(
    "deep link /wellness-core#modalities lands on its anchor",
    atAnchor > MOVED,
    `scrollY ${atAnchor}px`,
  );

  // 4. Program page -> disclosures, the deepest link on the site. The strip
  //    sits at the very bottom, so this is the worst case for the reset.
  await page.goto(`${BASE}/wellness-core`, { waitUntil: "networkidle" });
  await scrollDown(12000);
  const beforeDisc = await y();
  await page
    .getByRole("link", { name: "Read the full disclosures" })
    .first()
    .click();
  await page.waitForURL("**/disclosures");
  await page.waitForTimeout(1200);
  const atDisc = await y();
  check(
    "/wellness-core (deep) -> /disclosures opens at top",
    beforeDisc > MOVED && atDisc < TOP,
    `left program page at ${beforeDisc}px, arrived at ${atDisc}px`,
  );

  // 5. Anchors within the disclosures contents list must clear the fixed nav.
  await page.goto(`${BASE}/disclosures`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Assumption of risk" }).first().click();
  await page.waitForTimeout(1200);
  const headingTop = await page.evaluate(() => {
    const el = document.getElementById("assumption-of-risk");
    return el ? Math.round(el.getBoundingClientRect().top) : -9999;
  });
  check(
    "disclosures anchor clears the fixed 68px nav",
    headingTop >= 0 && headingTop < 140,
    `heading sits ${headingTop}px from viewport top`,
  );

  // 6. The reverse direction, back to home via the wordmark.
  await page.goto(`${BASE}/wellness-core`, { waitUntil: "networkidle" });
  await scrollDown(3000);
  const progBefore = await y();
  await page.getByRole("link", { name: /home$/ }).first().click();
  await page.waitForURL(`${BASE}/`);
  await page.waitForTimeout(1200);
  const backHome = await y();
  check(
    "/wellness-core (scrolled) -> home opens at top",
    progBefore > MOVED && backHome < TOP,
    `left program page at ${progBefore}px, arrived at ${backHome}px`,
  );
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.pass);
console.log(
  `\n${results.length - failed.length}/${results.length} passed` +
    (failed.length ? `: ${failed.map((f) => f.name).join(", ")}` : ""),
);
process.exit(failed.length ? 1 : 0);

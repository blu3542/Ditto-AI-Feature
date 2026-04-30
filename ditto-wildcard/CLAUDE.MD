# CLAUDE.md — Ditto Wildcard Feature

## Project overview

Next.js 14 + Tailwind prototype of a new **Wildcard: Spicy Question of the Week** feature for Ditto's dating dashboard. The app renders correctly and is functional. Remaining work is visual polish — fonts and backgrounds need to match Ditto's real UI exactly.

---

## Current status

- ✅ App runs, all components render
- ✅ State machine works (choice → why → lock → agent preview)
- ✅ Layout and card structure correct
- ❌ Fonts not matching Ditto's exact typography
- ❌ Backgrounds not matching Ditto's exact gradients/glass effect

---

## Visual QA workflow

Reference screenshots of Ditto's real UI are in `/reference/`. These are the ground truth. Do not use assumed or invented values — derive everything from the reference images.

**The loop:**

```
1. Screenshot localhost:3000 with Playwright
2. Compare against /reference/ screenshots
3. Identify one specific discrepancy
4. Fix it in code
5. Screenshot again to verify
6. Repeat
```

Never batch multiple changes before screenshotting. One change, one verify, continue.

---

## Feature context (for reference only)

**What this feature does:**
Weekly spicy binary question on the Ditto dashboard. User picks A or B, writes one sentence why, locks in answer. Before their date, Ditto's iMessage agent asks if they want to reveal their answer to their match — only shown if both say yes.

**Why it exists:**
Ditto's LLM matching call is bottlenecked by profile data quality. Standard fields produce generic answers. The wildcard injects rotating, free-text signal that gives the matching agent richer personality context. The "why" field is the key signal — reasoning reveals more than selection alone.

**Stack:** Next.js 14, TypeScript, Tailwind CSS v3, next/font/google

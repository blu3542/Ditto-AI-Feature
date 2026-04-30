# Ditto Wildcard Feature — Prototype

A working Next.js prototype of the **Spicy Question of the Week** feature for Ditto's dating platform.

## What this is

This prototype demonstrates a new feature for Ditto's main dashboard: a weekly wildcard question that:

1. **Gamifies the profile** — users pick A or B and explain why in one sentence
2. **Feeds richer signal to the matching agent** — free-text reasoning gives the LLM qualitatively better data than any dropdown could
3. **Creates a mutual reveal mechanic** — Ditto texts you before your date asking if you want your match to see your answer. Only revealed if both say yes.

## Feature flow

```
1. Weekly spicy question appears on dashboard
2. User picks A or B
3. "Why?" text box appears — one sentence
4. User locks in answer
5. Ditto texts before the date: "want to reveal your answer?"
6. YES/NO → only revealed if mutual YES
7. Match sees each other's answer + reasoning in the date plan
```

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **DM Serif Display + DM Sans** — matching Ditto's typography

## Project structure

```
app/
  layout.tsx       # Root layout with font imports
  page.tsx         # Entry point
  globals.css      # Tailwind + custom utilities

components/
  PhoneFrame.tsx   # Outer phone shell with ambient orbs
  TopBar.tsx       # Avatar + menu
  FindingCard.tsx  # "Ditto is finding you a date" card
  WildcardCard.tsx # ← The feature (main component)
  ProfileCard.tsx  # "What Ditto knows about you" section
```

## Why this feature

Ditto's matching quality is entirely bottlenecked by what users tell it. Standard profile fields (green flags, red flags, politics) collect **generic, self-reported, aspirational answers** — everyone says "good communication." 

The wildcard question injects **novel, rotating signal** that:
- Breaks the homogeneity of profile data fed to the matching LLM
- Captures personality through *reasoning*, not just selection
- Creates a shared cultural moment across the user base weekly
- Gives users a reason to return to the dashboard (currently passive)

The reveal mechanic mirrors Ditto's existing iMessage-first philosophy — zero new UI complexity, just extending the agent's existing behavior.

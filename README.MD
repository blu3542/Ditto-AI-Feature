# Ditto Wildcard

> Product design, customer research, and iteration are covered in the video walkthrough. This README covers code and infrastructure.
> [Video walkthrough](https://drive.google.com/file/d/1dbVhPKJOasORw6js56sIcoVO7Ku6OASa/view?usp=sharing)

Next.js prototype of a new Ditto dashboard feature: **Wildcard: Spicy Question of the Week** — a weekly binary question that collects free-text reasoning to improve matching signal quality.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- next/font/google

## Project structure

```
app/
  layout.tsx                        # Root layout, font imports
  page.tsx                          # Entry point
  globals.css                       # Tailwind + custom utilities

components/
  PhoneFrame.tsx                    # Outer phone shell with ambient background
  TopBar.tsx                        # Avatar and nav
  FindingCard.tsx                   # "Ditto is finding you a date" status card
  WildcardCard.tsx                  # The feature — question, choice, why, lock flow
  ProfileCard.tsx                   # "What Ditto knows about you" section
  AuthProvider.tsx                  # Supabase session context
  onboarding/
    OnboardingFlow.tsx              # Multi-step onboarding shell
    steps/Step1Basics.tsx           # Name, age, gender
    steps/Step2About.tsx            # Bio and hobbies
    steps/Step3Impression.tsx       # First impression prompt
    steps/Step4Type.tsx             # Partner type preferences
    steps/Step5Preferences.tsx      # Dealbreakers and green flags
    steps/Step6Photos.tsx           # Photo upload
    ui/Chip.tsx                     # Reusable selection chip
    ui/StepHeader.tsx               # Step title and subtitle

lib/
  supabase.ts                       # Supabase client init
```

## Production architecture

The question pool is hardcoded in `WildcardCard.tsx` as a static `QUESTIONS` object for demo purposes. This is a prototype convenience — not the target architecture.

See `WildCard-Agent-System-Design.png` in the repo root for the full system diagram.

Production pipeline:

```
EventBridge cron
  → Scraper Lambda          # pulls trending cultural moments weekly
  → LLM question generator  # formats binary options, scores for novelty + tone
  → Database                # stores approved question pool with active-week flag
  → Dashboard               # fetches current week's question on load
```

The scraper-to-LLM step owns question quality: novelty scoring, spiciness calibration, and filtering before anything reaches the database. Swapping the hardcoded array for this pipeline is a straight database read — the component interface doesn't change.

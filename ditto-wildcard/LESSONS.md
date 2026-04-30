# Lessons Learned

## Liquid Glass Button Effect (IN PROGRESS — not yet exact)

### Goal
Match the translucent "liquid glass" pill buttons on the real Ditto app ("Pause Ditto", "Message Ditto", "In-depth level", "Ideal look").

### What the real Ditto buttons use (extracted via Playwright)
- `background: rgba(255, 255, 255, 0.1)`
- `backdrop-filter: blur(10px)`
- `border: 0px` (no border at all)
- `border-radius: 9999px`
- `color: white`

### What we tried
1. Started with `rgba(255,255,255,0.12)` + explicit white border → looked too "drawn", not glassy
2. Removed the border, matched the real Ditto values → little visible difference because the hero photo is naturally dark at the bottom (where the buttons sit), so the backdrop blur blurs dark pixels rather than warm/bright ones
3. Switched to a gradient fill + higher blur + inset highlight:
   ```css
   background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 100%);
   backdrop-filter: blur(20px) saturate(180%);
   box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08);
   border: none;
   ```
   → Improved but still not matching the real app exactly.

### Why it's hard to match
- The real Ditto app is a native-feeling web app where the button sits over a **bright, colorful background** at a specific scroll position. The backdrop blur captures warm photo tones, making the glass look vivid.
- In our prototype the buttons are static over a photo that is dark in the lower half (the silhouetted couple + dark field), so the blurred content behind the button is dark, muting the glass effect.

### Ideas to try next
- Adjust `background-position` on `status_finding.webp` so the golden/warm upper portion of the photo falls behind the buttons instead of the dark lower half.
- Try `backdrop-filter: blur(10px) brightness(1.4)` to artificially brighten what shows through.
- Try a very subtle colored tint (warm amber) instead of white for the gradient, picking up the photo's dominant color.
- Inspect the real Ditto button's `box-shadow` and `outline` more carefully — the border-like edge on the real buttons may come from a shadow, not a border property.

---

## Phone Frame — Liquid Glass Border

### Problem
The phone frame's liquid glass border was being filled by the inner content (hero photo and sky section backgrounds extended edge-to-edge inside the `overflow-hidden` outer container), making the border invisible.

### Fix that worked
Replace the single `overflow-hidden` outer container with a two-layer approach:
- **Outer div**: `p-4` (16px padding) + glass background + `backdropFilter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.25)`. No `overflow-hidden`.
- **Inner div**: `rounded-[30px] overflow-hidden` containing the scrollable content.

The 16px padding ring on the outer container now shows the glass background clearly, acting as the liquid glass border.

---

## Phone Frame — Wavy Section Divider

### Problem
The wave divider between the hero photo section and the dark blue sky section was rendering as a dark navy strip instead of the intended white/cream wave from the ground truth.

### Failed attempt
Replaced the CSS mask approach with a standalone white `<svg>` wave element inserted between the two sections in document flow. Result looked wrong — the wave appeared as a flat white bar, disconnected from both backgrounds.

### Root cause (not yet resolved)
The existing mask (`WAVE_MASK`) clips the top of the sky section to create a wavy top edge, but the sky section's dark overlay (`rgba(4,18,32,0.58)`) bleeds into the transition area, making the wave appear dark instead of white.

### What the ground truth shows
- A solid white/cream zigzag strip (~20px tall) cleanly separating the hero photo from the dark blue section.
- The wave teeth point downward into the blue section.
- No dark band or gap visible.

### Ideas to try next
- Keep the mask approach but add a white SVG wave overlay element **on top** (absolutely positioned, `z-20`) at the boundary — rather than replacing the mask entirely.
- Try pushing the dark overlay down so it starts below the wave area (e.g., add `paddingTop` to the overlay div matching the wave height).
- Reduce the dark overlay opacity in the transition zone.

---

## "Zoomed out" phone frame — failed scaling attempts

### Problem
The prototype looks more zoomed out than the real Ditto app because the 480×784px phone frame sits in a 1456px-wide desktop viewport.

### Failed attempt 1 — `zoom: 1.35` on the phone wrapper
`zoom` expands the element's layout footprint. The `<main>` container (with `min-h-screen`) grew taller to fit the zoomed phone, which stretched the absolutely-positioned background beyond the viewport. Background clearly affected.

### Failed attempt 2 — `transform: scale(1.35)` + `h-screen` on main
Locking main to `h-screen` and using transform scale broke the overall page layout.

### What NOT to do
- Do not use `zoom` on the phone wrapper — it affects the layout and stretches the background.
- Do not change `min-h-screen` to `h-screen` — breaks page layout.
- Do not use `transform: scale` + page layout changes together.
- Do not use `zoom` on the inner content wrapper inside the phone — the sections use `absolute inset-0` backgrounds which break under a zoomed parent.
- Do not use `zoom: 1.25` + `width: calc(100% / 1.25)` trick inside the scroll container — looks broken in practice.

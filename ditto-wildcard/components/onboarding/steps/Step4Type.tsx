"use client";

import { useRef } from "react";
import Chip from "../ui/Chip";
import type { FormData } from "../OnboardingFlow";

const LOOKING_FOR = [
  { value: "life_partner", label: "Life partner" },
  { value: "serious", label: "Serious relationship" },
  { value: "casual", label: "Casual dating" },
  { value: "new_friends", label: "New friends" },
  { value: "not_sure", label: "Not sure yet" },
];

const INTERESTED_IN = [
  { value: "man", label: "Man" },
  { value: "woman", label: "Woman" },
  { value: "nonbinary", label: "Nonbinary" },
  { value: "everyone", label: "Everyone" },
];

const ETHNICITIES = [
  "American Indian", "Black/African Descent", "East Asian",
  "Hispanic/Latino", "Middle Eastern", "Pacific Islander",
  "South Asian", "South East Asian", "White", "Other",
];

const RANGE_MIN = 18;
const RANGE_MAX = 65;

interface Props {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

function toggleInArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function AgeRangeSlider({ ageMin, ageMax, onChange }: {
  ageMin: number;
  ageMax: number;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const toPercent = (val: number) =>
    ((val - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100;

  const getValueFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return RANGE_MIN;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(RANGE_MIN + ratio * (RANGE_MAX - RANGE_MIN));
  };

  const handlePointerDown = (which: "min" | "max") => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const val = getValueFromClientX(ev.clientX);
      if (which === "min") onChange({ age_min: Math.min(val, ageMax - 1) });
      else onChange({ age_max: Math.max(val, ageMin + 1) });
    };

    handle.addEventListener("pointermove", onMove as EventListener);
    handle.addEventListener("pointerup", () => {
      handle.removeEventListener("pointermove", onMove as EventListener);
    }, { once: true });
  };

  const minPct = toPercent(ageMin);
  const maxPct = toPercent(ageMax);

  return (
    <div>
      <div ref={containerRef} className="relative h-8 flex items-center">
        {/* Background track */}
        <div
          className="absolute inset-x-0 h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        {/* Active fill */}
        <div
          className="absolute h-[3px] rounded-full pointer-events-none"
          style={{
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
            background: "rgba(255,20,147,1)",
          }}
        />
        {/* Min handle */}
        <div
          className="absolute w-[18px] h-[18px] rounded-full touch-none select-none"
          style={{
            left: `${minPct}%`,
            transform: "translateX(-50%)",
            background: "rgba(255,20,147,1)",
            boxShadow: "0 0 0 4px rgba(255,20,147,0.25)",
            cursor: "grab",
            zIndex: 2,
          }}
          onPointerDown={handlePointerDown("min")}
        />
        {/* Max handle */}
        <div
          className="absolute w-[18px] h-[18px] rounded-full touch-none select-none"
          style={{
            left: `${maxPct}%`,
            transform: "translateX(-50%)",
            background: "rgba(255,20,147,1)",
            boxShadow: "0 0 0 4px rgba(255,20,147,0.25)",
            cursor: "grab",
            zIndex: 2,
          }}
          onPointerDown={handlePointerDown("max")}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[13px] text-white/60">{ageMin} yrs</span>
        <span className="text-[13px] text-white/60">{ageMax} yrs</span>
      </div>
    </div>
  );
}

export default function Step4Type({ data, onChange }: Props) {
  const lookingFor = data.looking_for ?? [];
  const interestedIn = data.interested_in ?? [];
  const ethnicityPrefs = data.ethnicity_preferences ?? [];

  return (
    <div className="space-y-6">
      {/* Looking for */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">What are you looking for right now?</p>
        <p className="text-[12px] text-white/30 mb-3">Select on their app</p>
        <div className="flex flex-wrap gap-2">
          {LOOKING_FOR.map(({ value, label }) => (
            <Chip
              key={value}
              label={label}
              selected={lookingFor.includes(value)}
              onToggle={() => onChange({ looking_for: toggleInArray(lookingFor, value) })}
              color="pink"
            />
          ))}
        </div>
      </div>

      {/* Who to date */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">Who do you want to date?</p>
        <p className="text-[12px] text-white/30 mb-3">Drag the bar below to adjust</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTED_IN.map(({ value, label }) => (
            <Chip
              key={value}
              label={label}
              selected={interestedIn.includes(value)}
              onToggle={() => onChange({ interested_in: toggleInArray(interestedIn, value) })}
              color="pink"
            />
          ))}
        </div>
      </div>

      {/* Age range */}
      <div>
        <p className="text-[15px] text-white font-medium mb-3">What age range would you like to date in?</p>
        <AgeRangeSlider
          ageMin={data.age_min ?? 18}
          ageMax={data.age_max ?? 35}
          onChange={onChange}
        />
      </div>

      {/* Ethnicity preferences */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">What ethnicities are you attracted to?</p>
        <p className="text-[12px] text-white/30 mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          <Chip
            label="No preference"
            selected={ethnicityPrefs.length === 0}
            onToggle={() => onChange({ ethnicity_preferences: [] })}
            color="pink"
          />
          {ETHNICITIES.map((e) => (
            <Chip
              key={e}
              label={e}
              selected={ethnicityPrefs.includes(e)}
              onToggle={() => onChange({ ethnicity_preferences: toggleInArray(ethnicityPrefs, e) })}
              color="pink"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

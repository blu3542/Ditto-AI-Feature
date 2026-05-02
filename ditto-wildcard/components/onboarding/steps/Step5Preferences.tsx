"use client";

import type { FormData } from "../OnboardingFlow";

const MATCH_STYLES = [
  { value: "fast", label: "⚡ Fast", sub: "speed over perfection" },
  { value: "balance", label: "⚖️ Balance", sub: "decent fit" },
  { value: "intentional", label: "🎯 Intentional", sub: "most preferences match" },
  { value: "wait", label: "💎 Wait for the one", sub: "all boxes checked" },
];

interface PhysicalPrefProps {
  label: string;
  value: string | null | undefined;
  onChange: (val: string | null) => void;
}

function PhysicalPref({ label, value, onChange }: PhysicalPrefProps) {
  const isDontCare = value === null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[15px] text-white font-medium">{label}</p>
        <label className="flex items-center gap-1.5 cursor-pointer select-none" onClick={() => onChange(isDontCare ? "" : null)}>
          <span className="text-[12px] text-white/40">i don't care</span>
          <div
            className="w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-150"
            style={
              isDontCare
                ? { background: "rgba(255,20,147,1)", border: "1.5px solid rgba(255,20,147,1)" }
                : { background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)" }
            }
          >
            {isDontCare && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </label>
      </div>
      {!isDontCare && (
        <input
          className="why-textarea w-full rounded-[12px] px-4 py-3 text-[15px] animate-fade-up"
          placeholder={`What matters to you about ${label.toLowerCase()}?`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

interface Props {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

export default function Step5Preferences({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Physical attractiveness */}
      <div>
        <p className="text-[15px] text-white font-medium mb-4">What do you find physically attractive?</p>
        <div className="space-y-4">
          <PhysicalPref
            label="Height & Build"
            value={data.physical_height_pref}
            onChange={(val) => onChange({ physical_height_pref: val })}
          />
          <PhysicalPref
            label="Facial Features"
            value={data.physical_facial_pref}
            onChange={(val) => onChange({ physical_facial_pref: val })}
          />
          <PhysicalPref
            label="Energy & Vibes"
            value={data.physical_energy_pref}
            onChange={(val) => onChange({ physical_energy_pref: val })}
          />
        </div>
      </div>

      {/* Match style */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">How do you want Ditto to match you rn?</p>
        <p className="text-[12px] text-white/30 mb-3">Drag the bar below to adjust</p>
        <div className="flex flex-col gap-2">
          {MATCH_STYLES.map(({ value, label, sub }) => (
            <button
              key={value}
              onClick={() => onChange({ match_style: value })}
              className="flex items-center gap-3 px-4 py-3.5 rounded-[12px] text-left transition-all duration-150"
              style={
                data.match_style === value
                  ? { background: "rgba(255,20,147,0.15)", border: "1px solid rgba(255,20,147,0.4)" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: data.match_style === value
                    ? "2px solid rgba(255,20,147,0.9)"
                    : "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {data.match_style === value && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,20,147,1)" }} />
                )}
              </div>
              <p className="text-[15px] font-medium" style={{ color: data.match_style === value ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)" }}>
                {label} <span className="font-normal text-white">- {sub}</span>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Chip from "../ui/Chip";
import type { FormData } from "../OnboardingFlow";

function formatDate(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ETHNICITIES = [
  "American Indian", "Black/African Descent", "East Asian",
  "Hispanic/Latino", "Middle Eastern", "Pacific Islander",
  "South Asian", "South East Asian", "White", "Other",
];

const GENDERS = ["Female", "Male", "Nonbinary"];

interface Props {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

export default function Step1Basics({ data, onChange }: Props) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const toggleEthnicity = (val: string) => {
    const current = data.ethnicity ?? [];
    onChange({
      ethnicity: current.includes(val) ? current.filter((e) => e !== val) : [...current, val],
    });
  };

  return (
    <div className="space-y-6">
      {/* Name */}
      <div>
        <p className="text-[15px] text-white font-medium mb-2">What's your name?</p>
        <input
          className="why-textarea w-full rounded-[12px] px-4 py-3 text-[16px]"
          placeholder="Your name"
          value={data.name ?? ""}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      {/* Birthday */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">When is your birthday?</p>
        <p className="text-[12px] text-white/30 mb-2">Only your age will be shown to others</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => dateInputRef.current?.showPicker()}
            className="why-textarea w-full rounded-[12px] px-4 py-3 text-[16px] text-left flex items-center justify-between"
          >
            <span style={{ color: data.birthday ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)" }}>
              {data.birthday ? formatDate(data.birthday) : "Select your birthday"}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
              <path d="M5 1v3M11 1v3M2 7h12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <input
            ref={dateInputRef}
            type="date"
            className="absolute inset-0 opacity-0 pointer-events-none"
            value={data.birthday ?? ""}
            onChange={(e) => onChange({ birthday: e.target.value })}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <p className="text-[15px] text-white font-medium mb-3">What's your gender?</p>
        <div className="flex gap-2">
          {GENDERS.map((g) => (
            <Chip
              key={g}
              label={g}
              selected={data.gender === g.toLowerCase()}
              onToggle={() => onChange({ gender: g.toLowerCase() })}
              color="pink"
            />
          ))}
        </div>
      </div>

      {/* Ethnicity */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">What's your ethnicity?</p>
        <p className="text-[12px] text-white/30 mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {ETHNICITIES.map((e) => (
            <Chip
              key={e}
              label={e}
              selected={(data.ethnicity ?? []).includes(e)}
              onToggle={() => toggleEthnicity(e)}
              color="pink"
            />
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <p className="text-[15px] text-white font-medium mb-3">How tall are you?</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="why-textarea w-16 rounded-[12px] px-3 py-3 text-[16px] text-center"
              placeholder="5"
              min={3} max={8}
              value={data.height_ft ?? ""}
              onChange={(e) => onChange({ height_ft: parseInt(e.target.value) || undefined })}
            />
            <span className="text-white/40 text-[14px]">ft</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="why-textarea w-16 rounded-[12px] px-3 py-3 text-[16px] text-center"
              placeholder="7"
              min={0} max={11}
              value={data.height_in ?? ""}
              onChange={(e) => onChange({ height_in: parseInt(e.target.value) || undefined })}
            />
            <span className="text-white/40 text-[14px]">in</span>
          </div>
        </div>
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.uses_metric ?? false}
            onChange={(e) => onChange({ uses_metric: e.target.checked })}
            className="accent-purple-500"
          />
          <span className="text-[13px] text-white/40">metric unit (cm)</span>
        </label>
      </div>
    </div>
  );
}

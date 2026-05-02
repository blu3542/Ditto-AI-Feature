"use client";

import type { FormData } from "../OnboardingFlow";

const SCHOOL_YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Master", "PhD", "Other"];

interface Props {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

export default function Step2About({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Social proof banner */}
      <img src="/87-percent.png" alt="People with detailed responses have 87% more matches" className="w-full rounded-[16px]" />

      {/* Hobbies */}
      <div>
        <p className="text-[15px] text-white font-medium mb-2">Share your hobbies and interests</p>
        <textarea
          className="why-textarea w-full rounded-[12px] px-4 py-3"
          rows={4}
          placeholder="e.g. hiking, film photography, cooking ramen..."
          value={data.hobbies ?? ""}
          onChange={(e) => onChange({ hobbies: e.target.value })}
        />
      </div>

      {/* School year */}
      <div>
        <p className="text-[15px] text-white font-medium mb-3">What year are you in?</p>
        <div className="flex flex-col gap-2">
          {SCHOOL_YEARS.map((year) => (
            <button
              key={year}
              onClick={() => onChange({ school_year: year.toLowerCase() })}
              className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-left transition-all duration-150"
              style={
                data.school_year === year.toLowerCase()
                  ? { background: "rgba(255,20,147,0.15)", border: "1px solid rgba(255,20,147,0.4)" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: data.school_year === year.toLowerCase()
                    ? "2px solid rgba(255,20,147,0.9)"
                    : "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {data.school_year === year.toLowerCase() && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,20,147,1)" }} />
                )}
              </div>
              <span className="text-[15px]" style={{ color: data.school_year === year.toLowerCase() ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}>
                {year}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

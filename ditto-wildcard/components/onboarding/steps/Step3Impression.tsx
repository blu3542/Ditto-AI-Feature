"use client";

import type { FormData } from "../OnboardingFlow";

const REFERRAL_SOURCES = ["Poster", "Instagram", "TikTok", "X (Twitter)", "RedNote (Xiaohongshu)", "Friend"];

interface Props {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

export default function Step3Impression({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* First impression */}
      <div>
        <p className="text-[15px] text-white font-medium mb-1">
          What's the first thing you'd want your match to know about you?
        </p>
        <p className="text-[12px] text-white/30 mb-3">They'll see it when they're matched with you.</p>
        <textarea
          className="why-textarea w-full rounded-[12px] px-4 py-3"
          rows={4}
          placeholder="e.g. I'm always down for a spontaneous adventure..."
          value={data.first_impression ?? ""}
          onChange={(e) => onChange({ first_impression: e.target.value })}
        />
      </div>

      {/* Referral source */}
      <div>
        <p className="text-[15px] text-white font-medium mb-3">Where did you hear from us?</p>
        <div className="flex flex-col gap-2">
          {REFERRAL_SOURCES.map((src) => (
            <button
              key={src}
              onClick={() => onChange({ referral_source: src })}
              className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-left transition-all duration-150"
              style={
                data.referral_source === src
                  ? { background: "rgba(255,20,147,0.15)", border: "1px solid rgba(255,20,147,0.4)" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: data.referral_source === src
                    ? "2px solid rgba(255,20,147,0.9)"
                    : "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {data.referral_source === src && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,20,147,1)" }} />
                )}
              </div>
              <span className="text-[15px]" style={{ color: data.referral_source === src ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}>
                {src}
              </span>
            </button>
          ))}

          {/* Other with inline text input */}
          <button
            onClick={() => onChange({ referral_source: "Other:" })}
            className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-left transition-all duration-150"
            style={
              data.referral_source === "Other:"
                ? { background: "rgba(255,20,147,0.15)", border: "1px solid rgba(255,20,147,0.4)" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }
            }
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{
                border: data.referral_source === "Other:"
                  ? "2px solid rgba(255,20,147,0.9)"
                  : "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {data.referral_source === "Other:" && (
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,20,147,1)" }} />
              )}
            </div>
            <span className="text-[15px]" style={{ color: data.referral_source === "Other:" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}>
              Other:
            </span>
            {data.referral_source === "Other:" && (
              <input
                className="flex-1 bg-transparent outline-none text-[15px]"
                style={{ color: "rgba(220,180,255,0.9)" }}
                placeholder="Please specify..."
                value={data.referral_other ?? ""}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onChange({ referral_other: e.target.value })}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

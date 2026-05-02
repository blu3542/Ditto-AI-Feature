"use client";

interface StepHeaderProps {
  title: string;
  step: number;
  totalSteps: number;
  onBack: () => void;
}

export default function StepHeader({ title, step, totalSteps, onBack }: StepHeaderProps) {
  return (
    <div className="flex-shrink-0 px-6 pt-6 pb-4">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex gap-1.5 flex-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background: i < step
                  ? "rgba(160,80,240,0.8)"
                  : i === step - 1
                  ? "rgba(160,80,240,0.5)"
                  : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      <h2
        className="text-white text-[26px] leading-tight"
        style={{ fontFamily: "Spencer, serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

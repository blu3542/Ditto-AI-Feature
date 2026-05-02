"use client";

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  color?: "purple" | "pink";
}

export default function Chip({ label, selected, onToggle, color = "purple" }: ChipProps) {
  const selectedStyle =
    color === "purple"
      ? { background: "rgba(120,60,200,0.25)", border: "1px solid rgba(160,80,240,0.5)", color: "rgba(220,180,255,0.95)" }
      : { background: "rgba(255,255,255,1)", border: "1px solid rgba(255,255,255,1)", color: "rgba(255,20,147,1)" };

  return (
    <button
      onClick={onToggle}
      className="px-4 py-2.5 rounded-[8px] text-[14px] font-medium transition-all duration-150"
      style={
        selected
          ? selectedStyle
          : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
      }
    >
      {label}
    </button>
  );
}

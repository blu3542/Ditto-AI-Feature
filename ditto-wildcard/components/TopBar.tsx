"use client";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between">
      {/* Avatar + name pill */}
      <div
        className="flex items-center gap-3 px-2.5 py-2 rounded-full"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <img
          src="/avatar.jpg"
          alt="Ben"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="pr-1">
          <p className="text-base text-white font-medium leading-none mb-1">Ben</p>
          <p className="text-[14px] leading-none" style={{ color: "rgba(255,255,255,0.5)" }}>
            +15133175976
          </p>
        </div>
      </div>

      {/* Hamburger menu */}
      <button
        className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[6px]"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-5 h-[1.5px] rounded-full"
            style={{ background: "rgba(255,255,255,0.85)" }}
          />
        ))}
      </button>
    </div>
  );
}

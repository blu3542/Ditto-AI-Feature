"use client";

export default function FindingCard() {
  return (
    <div className="text-center mt-10 mb-5">
      <h1
        className="text-white text-[52px] leading-tight mb-4"
        style={{ fontFamily: "Spencer, serif" }}
      >
        Ditto is finding
        <br />
        you a date!
      </h1>
      <p className="text-white text-[17px] mb-10 leading-relaxed">
        Searching through your school to find
        <br />
        someone just right for you...
      </p>

      <div className="flex gap-4">
        <button
          className="flex-1 py-4 rounded-full text-[20px] text-white font-medium"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)",
          }}
        >
          Pause Ditto
        </button>
        <button
          className="flex-1 py-4 rounded-full text-[20px] text-white font-medium flex items-center justify-center gap-2.5"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)",
          }}
        >
          <img src="/imessage.png" alt="" className="w-6 h-6" />
          Message Ditto
        </button>
      </div>
    </div>
  );
}

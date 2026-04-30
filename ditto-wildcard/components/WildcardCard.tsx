"use client";

import { useState } from "react";

type Choice = "A" | "B" | null;
type CardState = "unanswered" | "choosing" | "explaining" | "locked";

const QUESTION = {
  text: "Would you rather date someone significantly hotter than you, or significantly smarter than you?",
  optionA: "Hotter than me 🔥",
  optionB: "Smarter than me 🧠",
  week: "Week of Apr 28",
};

export default function WildcardCard() {
  const [choice, setChoice] = useState<Choice>(null);
  const [why, setWhy] = useState("");
  const [cardState, setCardState] = useState<CardState>("unanswered");

  const handleChoiceSelect = (c: Choice) => {
    setChoice(c);
    setCardState("explaining");
  };

  const handleLock = () => {
    if (!choice || why.trim().length < 5) return;
    setCardState("locked");
  };

  const choiceLabel = choice === "A" ? QUESTION.optionA : QUESTION.optionB;

  const isLocked = cardState === "locked";

  return (
    <div>
      <p
        className="text-white text-[28px] text-center mb-1"
        style={{ fontFamily: "Spencer, serif" }}
      >
        Wildcard of the Week
      </p>
      <p
        className="text-center text-[14px] mb-5"
        style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        {QUESTION.week}
      </p>

      <div
        className={`rounded-[25px] overflow-hidden transition-all duration-300 ${
          isLocked ? "glass-card-active" : "glass-card"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🌶️</span>
            <span
              className="text-[13px] font-medium tracking-widest uppercase"
              style={{ color: "rgba(220,140,255,0.8)" }}
            >
              Spicy Question
            </span>
          </div>
          <span className="text-[13px] text-faint">New every Monday</span>
        </div>

        {/* Question */}
        <p className="px-5 pb-4 text-[21px] leading-snug text-primary">
          {QUESTION.text}
        </p>

        {/* ── STATE: unanswered or choosing ── */}
        {!isLocked && (
          <>
            {/* Choice buttons */}
            <div className="grid grid-cols-2 gap-2.5 px-5 pb-4">
              <button
                onClick={() => handleChoiceSelect("A")}
                className={`py-4 px-3 rounded-[15px] text-[16px] font-medium leading-tight text-center transition-all duration-200 ${
                  choice === "A"
                    ? "choice-selected-a"
                    : "choice-default"
                }`}
              >
                {QUESTION.optionA}
              </button>
              <button
                onClick={() => handleChoiceSelect("B")}
                className={`py-4 px-3 rounded-[15px] text-[16px] font-medium leading-tight text-center transition-all duration-200 ${
                  choice === "B"
                    ? "choice-selected-b"
                    : "choice-default"
                }`}
              >
                {QUESTION.optionB}
              </button>
            </div>

            {/* Why box — appears after choice */}
            {choice && (
              <div className="px-5 pb-4 animate-fade-up">
                <p className="text-[14px] mb-2.5" style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
                  Quick — why&apos;d you pick that? (one sentence)
                </p>
                <textarea
                  className="why-textarea w-full rounded-[15px] px-4 py-3"
                  rows={2}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  placeholder="e.g. looks fade but intelligence compounds..."
                />
              </div>
            )}

            {/* Lock button */}
            <button
              onClick={handleLock}
              disabled={!choice || why.trim().length < 5}
              className="btn-gradient mx-5 mb-5 w-[calc(100%-40px)] py-4 rounded-full text-white text-[17px] font-medium"
            >
              Lock in my answer
            </button>
          </>
        )}

        {/* ── STATE: locked ── */}
        {isLocked && (
          <div className="px-5 pb-5 animate-fade-up">
            {/* Locked banner */}
            <div
              className="rounded-[15px] p-4 flex items-start gap-3"
              style={{
                background: "rgba(120,60,200,0.12)",
                border: "1px solid rgba(160,80,240,0.2)",
              }}
            >
              <span className="text-xl mt-0.5">🔒</span>
              <div>
                <p className="text-[16px] font-medium text-purple-accent mb-1">
                  Answer locked in
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Ditto will text you before your date to ask if you want your
                  match to see this. Only revealed if you both say yes.
                </p>
              </div>
            </div>

            {/* Answer preview */}
            <div
              className="mt-3 rounded-[13px] p-4 text-[15px] leading-relaxed"
              style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}
            >
              <span className="text-purple-accent font-medium">Your answer: </span>
              {choiceLabel}
              <br />
              <span className="text-purple-accent font-medium">Why: </span>
              {why}
            </div>

            {/* Agent message preview */}
            <AgentMessagePreview choice={choiceLabel} />
          </div>
        )}
      </div>
    </div>
  );
}

// Simulates the iMessage Ditto sends before the date
function AgentMessagePreview({ choice }: { choice: string }) {
  const [agentState, setAgentState] = useState<"pending" | "yes" | "no">("pending");

  return (
    <div className="mt-3">
      <p className="text-[13px] uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.2)" }}>
        Preview — Ditto&apos;s text before your date
      </p>

      <div
        className="rounded-[20px] p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* iMessage bubble */}
        <div className="flex items-start gap-2.5 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-medium text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c5cbf, #3a7bd5)" }}
          >
            D
          </div>
          <div
            className="rounded-[17px] rounded-tl-[4px] px-4 py-2.5 text-[15px] leading-relaxed text-white max-w-[280px]"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            hey! 👋 your date is set for friday. this week&apos;s wildcard was &quot;hotter or smarter?&quot; — you picked{" "}
            <span className="text-purple-accent font-medium">{choice.replace(/🔥|🧠/g, "").trim().toLowerCase()}</span>.
            <br /><br />
            want your match to see your answer? they&apos;ll only know if you both say yes 👀
          </div>
        </div>

        {/* Reply buttons */}
        {agentState === "pending" && (
          <div className="flex gap-2.5 pl-12">
            <button
              onClick={() => setAgentState("yes")}
              className="flex-1 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200"
              style={{
                background: "rgba(120,60,200,0.3)",
                border: "1px solid rgba(160,80,240,0.4)",
                color: "rgba(220,180,255,0.9)",
              }}
            >
              YES, reveal it
            </button>
            <button
              onClick={() => setAgentState("no")}
              className="flex-1 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              No, keep private
            </button>
          </div>
        )}

        {agentState === "yes" && (
          <div className="pl-12 animate-fade-up">
            <div
              className="rounded-[17px] rounded-tl-[4px] px-4 py-2.5 text-[15px] leading-relaxed text-white"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              love it 😏 if they say yes too, you&apos;ll both see each other&apos;s answers in the date plan. see you friday!
            </div>
          </div>
        )}

        {agentState === "no" && (
          <div className="pl-12 animate-fade-up">
            <div
              className="rounded-[17px] rounded-tl-[4px] px-4 py-2.5 text-[15px] leading-relaxed text-white"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              got it — keeping it private. your answer still helps ditto find better matches for you 🤝 see you friday!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

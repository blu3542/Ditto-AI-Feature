"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import FindingCard from "./FindingCard";
import WildcardCard from "./WildcardCard";
import ProfileCard from "./ProfileCard";
import OnboardingFlow from "./onboarding/OnboardingFlow";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' seed='9' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix type='saturate' values='0' in='noise' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncR type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3CfeFuncG type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3CfeFuncB type='gamma' amplitude='2.4' exponent='6' offset='-0.4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`;

export default function PhoneFrame() {
  const [view, setView] = useState<"dashboard" | "onboarding">("dashboard");

  return (
    <div
      className="relative w-[480px] h-[980px] rounded-[44px] p-4"
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -1.5px 0 rgba(0,0,0,0.15), inset 1.5px 0 rgba(255,255,255,0.2), inset -1.5px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      <div className="h-full rounded-[30px] overflow-hidden">
        {view === "onboarding" ? (
          <div className="relative h-full">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/background-sky.webp')", backgroundSize: "cover", backgroundPosition: "center bottom" }} />
            <div className="absolute inset-0" style={{ background: "rgba(4, 18, 32, 0.6)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, backgroundSize: "cover", opacity: 0.35 }} />
            <div className="relative z-10 h-full">
              <OnboardingFlow
                onBack={() => setView("dashboard")}
                onComplete={() => setView("dashboard")}
              />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {/* ── HERO: couple-walking photo ── */}
            <div className="relative">
              <div className="absolute inset-0" style={{ backgroundImage: "url('/status_finding.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, backgroundSize: "cover", opacity: 0.45 }} />
              <div className="relative z-10 px-6 pt-8 pb-12">
                <TopBar />
                <FindingCard />
              </div>
            </div>

            {/* ── BOTTOM: sky/cloud photo ── */}
            <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.25)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "url('/background-sky.webp')", backgroundSize: "cover", backgroundPosition: "center bottom" }} />
              <div className="absolute inset-0" style={{ background: "rgba(4, 18, 32, 0.58)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, backgroundSize: "cover", opacity: 0.35 }} />
              <div className="relative z-10 px-6 pt-8 pb-12 flex flex-col gap-5">
                <ProfileCard onEditBasics={() => setView("onboarding")} />
                <WildcardCard />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

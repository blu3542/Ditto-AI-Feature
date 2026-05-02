"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Step1Basics from "./steps/Step1Basics";
import Step2About from "./steps/Step2About";
import Step3Impression from "./steps/Step3Impression";
import Step4Type from "./steps/Step4Type";
import Step5Preferences from "./steps/Step5Preferences";
import Step6Photos from "./steps/Step6Photos";

export interface FormData {
  name?: string;
  birthday?: string;
  gender?: string;
  ethnicity?: string[];
  height_ft?: number;
  height_in?: number;
  uses_metric?: boolean;
  hobbies?: string;
  school_year?: string;
  first_impression?: string;
  referral_source?: string;
  referral_other?: string;
  looking_for?: string[];
  interested_in?: string[];
  age_min?: number;
  age_max?: number;
  ethnicity_preferences?: string[];
  physical_height_pref?: string | null;
  physical_body_type_pref?: string | null;
  physical_facial_pref?: string | null;
  physical_energy_pref?: string | null;
  match_style?: string;
}

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function OnboardingFlow({ onComplete, onBack }: Props) {
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setFormData({
            name: data.name ?? undefined,
            birthday: data.birthday ?? undefined,
            gender: data.gender ?? undefined,
            ethnicity: data.ethnicity ?? undefined,
            height_ft: data.height_ft ?? undefined,
            height_in: data.height_in ?? undefined,
            uses_metric: data.uses_metric ?? false,
            hobbies: data.hobbies ?? undefined,
            school_year: data.school_year ?? undefined,
            first_impression: data.first_impression ?? undefined,
            referral_source: data.referral_source ?? undefined,
            referral_other: data.referral_other ?? undefined,
            looking_for: data.looking_for ?? undefined,
            interested_in: data.interested_in ?? undefined,
            age_min: data.age_min ?? undefined,
            age_max: data.age_max ?? undefined,
            ethnicity_preferences: data.ethnicity_preferences ?? undefined,
            physical_height_pref: data.physical_height_pref ?? undefined,
            physical_body_type_pref: data.physical_body_type_pref ?? undefined,
            physical_facial_pref: data.physical_facial_pref ?? undefined,
            physical_energy_pref: data.physical_energy_pref ?? undefined,
            match_style: data.match_style ?? undefined,
          });
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const onChange = (patch: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("No session found. Please refresh.");
      setSubmitting(false);
      return;
    }

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: session.user.id,
      ...formData,
      onboarding_complete: true,
    });

    if (upsertError) {
      setError(upsertError.message);
      setSubmitting(false);
      return;
    }

    onComplete();
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: "rgba(4, 18, 32, 0.97)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "rgba(4, 18, 32, 0.97)" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex justify-center">
          <div
            className="inline-flex items-baseline gap-[6px] px-3 py-1.5 rounded-[8px]"
            style={{ background: "#0a0a0a", fontFamily: "Spencer, serif" }}
          >
            <span className="text-white text-[26px]">Tell Ditto your</span>
            <span className="text-[26px]" style={{ color: "rgba(255,20,147,1)" }}>basics</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="px-6 py-6 space-y-8">
          <Step1Basics data={formData} onChange={onChange} />
          <Step2About data={formData} onChange={onChange} />
          <Step3Impression data={formData} onChange={onChange} />

          {/* Section break */}
          <div className="pt-2">
            <div className="divider mb-6" />
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-baseline gap-[6px] px-3 py-1.5 rounded-[8px]"
                style={{ background: "#0a0a0a", fontFamily: "Spencer, serif" }}
              >
                <span className="text-white text-[26px]">Tell Ditto your</span>
                <span className="text-[26px]" style={{ color: "rgba(255,20,147,1)" }}>type</span>
              </div>
            </div>
            <Step4Type data={formData} onChange={onChange} />
          </div>

          <Step5Preferences data={formData} onChange={onChange} />
          <Step6Photos />

          {error && (
            <p className="text-[13px] text-center" style={{ color: "rgba(255,100,100,0.8)" }}>
              {error}
            </p>
          )}

          <p className="text-[11px] text-white/20 text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="underline">Terms</span> + <span className="underline">Privacy</span>
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex-shrink-0 px-6 pb-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-gradient w-full py-4 rounded-full text-white text-[17px] font-medium"
        >
          {submitting ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

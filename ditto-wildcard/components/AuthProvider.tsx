"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        supabase.auth.signInAnonymously();
      }
    });
  }, []);

  return <>{children}</>;
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

// This component can be used around any page or component that should be accessible
// only to verified users
export default function EmailVerifiedGuard({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !user.is_verified) {
      router.push("/auth/verify-prompt");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !user.is_verified) {
    return null;
  }

  return <>{children}</>;
}

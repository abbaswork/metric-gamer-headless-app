"use client";

import { useState } from "react";

interface HubSpotData {
  fields: {
    name: string;
    value: string;
  }[];
  context?: {
    pageUri: string;
    pageName: string;
  };
}

export type HubSpotStatus = "idle" | "loading" | "success" | "error";

export function useHubSpotForm(portalId: string, formId: string) {
  const [status, setStatus] = useState<HubSpotStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (email: string, firstName?: string) => {
    setStatus("loading");
    setError(null);

    const fields = [
      { name: "email", value: email },
    ];

    if (firstName) {
      fields.push({ name: "firstname", value: firstName });
    }

    const data: HubSpotData = {
      fields,
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: typeof document !== "undefined" ? document.title : "",
      },
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to submit form");
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "An unexpected error occurred");
      console.error("HubSpot Submission Error:", err);
    }
  };

  const resetStatus = () => setStatus("idle");

  return { submitForm, status, error, resetStatus, setStatus };
}

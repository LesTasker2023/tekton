"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#e2e8f0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: "2rem" }}>
          <p style={{ fontSize: "3rem", fontWeight: 800, margin: 0, opacity: 0.3 }}>
            500
          </p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "1rem 0" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1a1", lineHeight: 1.6, marginBottom: "2rem" }}>
            An unexpected error occurred. This has been reported automatically.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 1.5rem",
              background: "#e2e8f0",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 4,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

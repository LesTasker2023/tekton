"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen splash overlay that covers the Sanity Studio while it boots.
 * Watches for the studio to render real interactive content inside #sanity,
 * then fades out and unmounts.
 */
export function StudioSplash() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Sanity Studio renders inside <div id="sanity">. Once fully loaded,
    // it populates with deep DOM: navbar, tool menu, document panes.
    // We watch for the element count to stabilise — indicating it's done.
    let stableCount = 0;
    let lastChildCount = 0;
    let settled = false;

    const check = () => {
      const root = document.getElementById("sanity");
      if (!root) return;
      const count = root.querySelectorAll("*").length;
      // Need a meaningful amount of DOM (navbar + tool layout)
      if (count > 100 && count === lastChildCount) {
        stableCount++;
        // Stable for 3 consecutive checks (900ms) = loaded
        if (stableCount >= 3) {
          settled = true;
          setReady(true);
        }
      } else {
        stableCount = 0;
      }
      lastChildCount = count;
    };

    const interval = setInterval(check, 300);

    // Safety fallback — always reveal after 12s
    const timeout = setTimeout(() => {
      if (!settled) setReady(true);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // After fade-out completes, unmount
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(timer);
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        background: "#0a0a0a",
        opacity: ready ? 0 : 1,
        transition: "opacity 0.6s ease-out",
        pointerEvents: ready ? "none" : "auto",
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "#e2e8f0",
          userSelect: "none",
        }}
      >
        TEKTON
      </div>

      {/* Animated bar loader */}
      <div
        style={{
          width: 120,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
            animation: "splash-slide 1.2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#525252",
        }}
      >
        Loading Studio
      </div>

      <style>{`
        @keyframes splash-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

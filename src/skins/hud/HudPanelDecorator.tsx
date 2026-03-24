"use client";

/**
 * HUD corner brackets, accent tabs & hash marks for Panel.
 * Extracted verbatim from the original Panel component.
 */
export function HudPanelDecorator({ uid }: { uid: string }) {
  const O = 8;
  const P = 5;
  const A = 32;
  const N = 12;
  const W = 7;
  const tl = O - P;

  const glowUrl = `url(#${uid}-glow)`;
  const hatchUrl = `url(#${uid}-hatch)`;

  return (
    <svg className="hud-panel-decorator" aria-hidden>
      <defs>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" in="SourceGraphic" result="blur" />
          <feFlood
            floodColor="var(--color-accent)"
            floodOpacity="0.5"
            result="color"
          />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern
          id={`${uid}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            stroke="var(--corner-accent, rgba(var(--color-accent-rgb),0.35))"
            strokeWidth="2"
          />
        </pattern>
      </defs>

      {/* TL: notched diagonal + wedge */}
      <polyline
        className="hud-corner-line"
        points={`${tl},${tl + A} ${tl},${tl + N} ${tl + N},${tl} ${tl + A},${tl}`}
        style={{ filter: glowUrl }}
      />
      <polygon
        className="hud-corner-fill"
        points={`${tl},${tl + N + W} ${tl},${tl + N} ${tl + N},${tl} ${tl + N + W},${tl}`}
        style={{ filter: glowUrl }}
      />
      <circle
        className="hud-indicator-dot"
        cx={tl + 3}
        cy={tl + A + 10}
        r="2"
      />

      {/* TR: L-bracket */}
      <line
        className="hud-corner-line"
        x1={`calc(100% - ${O}px)`}
        y1={O + A}
        x2={`calc(100% - ${O}px)`}
        y2={O}
        style={{ filter: glowUrl }}
      />
      <line
        className="hud-corner-line"
        x1={`calc(100% - ${O}px)`}
        y1={O}
        x2={`calc(100% - ${O + A}px)`}
        y2={O}
        style={{ filter: glowUrl }}
      />

      {/* Top edge: chevron accent bar */}
      <polygon
        className="hud-accent-bar"
        points={`
          calc(100% - ${O + A + 50}px),${O - 1}
          calc(100% - ${O + A + 55}px),${O + 3}
          calc(100% - ${O + A + 85}px),${O + 3}
          calc(100% - ${O + A + 80}px),${O - 1}
        `}
        style={{ filter: glowUrl }}
      />
      <line
        className="hud-accent-bar"
        x1={`calc(100% - ${O + A + 44}px)`}
        y1={O}
        x2={`calc(100% - ${O + A + 36}px)`}
        y2={O}
        style={{
          strokeWidth: 2,
          fill: "none",
          stroke: "var(--corner-accent, rgba(var(--color-accent-rgb),0.4))",
        }}
      />

      {/* BL: L-bracket + decorations */}
      <line
        className="hud-corner-line"
        x1={O}
        y1={`calc(100% - ${O + A}px)`}
        x2={O}
        y2={`calc(100% - ${O}px)`}
        style={{ filter: glowUrl }}
      />
      <line
        className="hud-corner-line"
        x1={O}
        y1={`calc(100% - ${O}px)`}
        x2={O + A}
        y2={`calc(100% - ${O}px)`}
        style={{ filter: glowUrl }}
      />
      <line
        className="hud-cross-mark"
        x1={O}
        y1={`calc(100% - ${O + 3}px)`}
        x2={O}
        y2={`calc(100% - ${O - 3}px)`}
      />
      <line
        className="hud-cross-mark"
        x1={O - 3}
        y1={`calc(100% - ${O}px)`}
        x2={O + 3}
        y2={`calc(100% - ${O}px)`}
      />

      {/* BL: hatched accent block */}
      <polygon
        className="hud-hatch-block"
        points={`
          ${O + A + 6},calc(100% - ${O + 5}px)
          ${O + A + 6},calc(100% - ${O - 1}px)
          ${O + A + 30},calc(100% - ${O - 1}px)
          ${O + A + 30},calc(100% - ${O + 5}px)
        `}
        style={{ fill: hatchUrl }}
      />
      <polygon
        className="hud-accent-tab"
        points={`
          ${O + A + 34},calc(100% - ${O + 5}px)
          ${O + A + 34},calc(100% - ${O - 1}px)
          ${O + A + 54},calc(100% - ${O - 1}px)
          ${O + A + 50},calc(100% - ${O + 5}px)
        `}
        style={{ filter: glowUrl }}
      />
      <circle
        className="hud-indicator-dot"
        cx={O + A + 60}
        cy={`calc(100% - ${O}px)`}
        r="1.5"
      />
      <circle
        className="hud-indicator-dot"
        cx={O + A + 66}
        cy={`calc(100% - ${O}px)`}
        r="1.5"
      />
      <circle
        className="hud-indicator-dot-bright"
        cx={O + A + 72}
        cy={`calc(100% - ${O}px)`}
        r="1.5"
      />

      {/* BR: small filled wedge */}
      <rect
        className="hud-corner-fill"
        x={`calc(100% - ${tl + N + W}px)`}
        y={`calc(100% - ${tl + N + W}px)`}
        width={N + W}
        height={N + W}
        style={{
          filter: glowUrl,
          clipPath: `polygon(100% 0%, 100% ${N}px, ${N}px 100%, 0% 100%)`,
        }}
      />
    </svg>
  );
}

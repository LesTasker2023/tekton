"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useChartTheme } from "./useChartTheme";
import { Panel } from "@/components/ui/Panel";
import styles from "./charts.module.scss";

/* ── Types ── */

export interface RadarSeries {
  dataKey: string;
  label: string;
  color?: string;
}

export interface HudRadarChartProps {
  /** Array of data points — each needs a `subject` key plus numeric values per series. */
  data: Record<string, string | number>[];
  /** One or more radar overlays. */
  series: RadarSeries[];
  /** Optional title */
  title?: string;
  /** Height — default 300 */
  height?: number;
}

/* ── Component ── */

export function HudRadarChart({
  data,
  series,
  title,
  height = 300,
}: HudRadarChartProps) {
  const { PALETTE, TOOLTIP_STYLE, POLAR_GRID_STROKE, TEXT_MUTED } = useChartTheme();
  return (
    <Panel size="flush" noAnimation>
      <div className={styles.chartInner}>
        {title && <div className={styles.chartTitle}>{title}</div>}
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke={POLAR_GRID_STROKE} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: TEXT_MUTED,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            />
            <PolarRadiusAxis angle={90} tick={false} axisLine={false} />
            {series.map((s, i) => {
              const c = s.color ?? PALETTE[i % PALETTE.length];
              return (
                <Radar
                  key={s.dataKey}
                  name={s.label}
                  dataKey={s.dataKey}
                  stroke={c}
                  strokeWidth={2}
                  fill={c}
                  fillOpacity={0.15}
                  animationDuration={800}
                  dot={{ r: 3, fill: c, strokeWidth: 0 }}
                />
              );
            })}
            <Tooltip {...TOOLTIP_STYLE} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

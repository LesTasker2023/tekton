"use client";

import styles from "./ProgressBar.module.scss";

export type ProgressVariant = "primary" | "accent" | "success" | "warning" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  /** Current value (0-100) */
  value: number;
  /** Color variant (default: "primary") */
  variant?: ProgressVariant;
  /** Size variant (default: "md") */
  size?: ProgressSize;
  /** Accessible label text */
  label?: string;
  /** Show percentage text (default: true) */
  showValue?: boolean;
  /** Pulse animation on the fill (default: false) */
  animated?: boolean;
  /** Optional className */
  className?: string;
}

export function ProgressBar({
  value,
  variant = "primary",
  size = "md",
  label,
  showValue = true,
  animated = false,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const classes = [
    styles.progress,
    variant !== "primary" && styles[`progress--${variant}`],
    size !== "md" && styles[`progress--${size}`],
    animated && styles["progress--animated"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      data-component="progress-bar"
      data-variant={variant}
      data-size={size}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Progress: ${Math.round(clamped)}%`}
    >
      {label && <span className={styles.progress__label}>{label}</span>}
      <div className={styles.progress__track}>
        <div
          className={styles.progress__fill}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showValue && (
        <span className={styles.progress__value}>{Math.round(clamped)}%</span>
      )}
    </div>
  );
}

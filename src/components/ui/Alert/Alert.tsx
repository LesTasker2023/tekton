"use client";

import { useState } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import styles from "./Alert.module.scss";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantIcons: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

export function Alert({
  variant = "info",
  title,
  children,
  icon = true,
  dismissible = false,
  onDismiss,
  className = "",
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const Icon = variantIcons[variant];

  const classes = [
    styles.alert,
    styles[`alert--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={classes}
      role="alert"
      data-component="alert"
      data-variant={variant}
    >
      {icon && (
        <span className={styles.alert__icon}>
          <Icon size={18} />
        </span>
      )}

      <div className={styles.alert__content}>
        {title && <p className={styles.alert__title}>{title}</p>}
        <div className={styles.alert__body}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.alert__close}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

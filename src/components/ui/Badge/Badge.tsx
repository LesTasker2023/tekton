import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  dot = false,
  className = "",
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[`badge--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} data-component="badge" data-variant={variant}>
      {dot && <span className={styles.badge__dot} />}
      {children}
    </span>
  );
}

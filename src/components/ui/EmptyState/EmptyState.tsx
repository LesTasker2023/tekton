import { Button } from "../Button";
import styles from "./EmptyState.module.scss";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
  className = "",
}: EmptyStateProps) {
  const classes = [
    styles["empty-state"],
    size !== "md" && styles[`empty-state--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-component="empty-state" data-size={size}>
      {icon && <div className={styles["empty-state__icon"]}>{icon}</div>}

      <h3 className={styles["empty-state__title"]}>{title}</h3>

      {description && (
        <p className={styles["empty-state__description"]}>{description}</p>
      )}

      {(action || secondaryAction) && (
        <div className={styles["empty-state__actions"]}>
          {action && (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

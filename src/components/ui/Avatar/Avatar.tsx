"use client";

import { useState } from "react";
import styles from "./Avatar.module.scss";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Image URL */
  src?: string;
  /** Alt text / name for fallback initials */
  name?: string;
  /** Size (default: "md") */
  size?: AvatarSize;
  /** Show status indicator */
  status?: "online" | "offline" | "away";
  /** Additional className */
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  src,
  name = "",
  size = "md",
  status,
  className = "",
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : "?";

  const classes = [
    styles.avatar,
    styles[`avatar--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} data-component="avatar" data-size={size}>
      {showImage ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className={styles.avatar__image}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.avatar__initials} aria-label={name || "Unknown user"}>
          {initials}
        </span>
      )}
      {status && (
        <span
          className={`${styles.avatar__status} ${styles[`avatar__status--${status}`]}`}
          aria-label={status}
        />
      )}
    </span>
  );
}

/* ── Avatar Group ── */

export interface AvatarGroupProps {
  /** Max avatars to show before +N indicator */
  max?: number;
  children: React.ReactNode;
}

export function AvatarGroup({ max = 4, children }: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = childArray.slice(0, max);
  const overflow = childArray.length - max;

  return (
    <div className={styles.group} data-component="avatar-group">
      {visible}
      {overflow > 0 && (
        <span className={`${styles.avatar} ${styles["avatar--md"]} ${styles.avatar__overflow}`}>
          +{overflow}
        </span>
      )}
    </div>
  );
}

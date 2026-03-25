"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Called when toggled */
  onChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Helper text below label */
  description?: string;
  /** Disabled state (default: false) */
  disabled?: boolean;
  /** Indeterminate state (default: false) */
  indeterminate?: boolean;
  /** Optional className */
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  className = "",
}: CheckboxProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const classes = [
    styles.checkbox,
    checked && styles["checkbox--checked"],
    disabled && styles["checkbox--disabled"],
    indeterminate && styles["checkbox--indeterminate"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      className={classes}
      htmlFor={id}
      data-component="checkbox"
    >
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className={styles.checkbox__input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={styles.checkbox__box} aria-hidden="true" />
      {(label || description) && (
        <span className={styles.checkbox__content}>
          {label && <span className={styles.checkbox__label}>{label}</span>}
          {description && (
            <span className={styles.checkbox__description}>{description}</span>
          )}
        </span>
      )}
    </label>
  );
}

"use client";

import { forwardRef, useId } from "react";
import styles from "./Input.module.scss";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text shown above the input */
  label?: string;
  /** Error message — triggers error styling */
  error?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Input size (default: "md") */
  size?: InputSize;
  /** Icon element rendered at the start of the input */
  leadingIcon?: React.ReactNode;
  /** Icon element rendered at the end of the input */
  trailingIcon?: React.ReactNode;
  /** Stretch to full container width (default: true) */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    size = "md",
    leadingIcon,
    trailingIcon,
    fullWidth = true,
    className = "",
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const wrapClasses = [
    styles.input,
    size !== "md" && styles[`input--${size}`],
    error && styles["input--error"],
    fullWidth && styles["input--full"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapClasses} data-component="input" data-size={size}>
      {label && (
        <label htmlFor={inputId} className={styles.input__label}>
          {label}
        </label>
      )}
      <div className={styles.input__field}>
        {leadingIcon && (
          <span className={styles.input__icon} data-part="leading">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={styles.input__native}
          aria-invalid={!!error}
          aria-describedby={
            [errorId, helperId].filter(Boolean).join(" ") || undefined
          }
          {...props}
        />
        {trailingIcon && (
          <span className={styles.input__icon} data-part="trailing">
            {trailingIcon}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} className={styles.input__error} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className={styles.input__helper}>
          {helperText}
        </span>
      )}
    </div>
  );
});

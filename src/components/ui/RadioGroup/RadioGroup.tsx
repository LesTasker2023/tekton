"use client";

import { useId } from "react";
import styles from "./RadioGroup.module.scss";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Input name attribute */
  name: string;
  /** Available options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Group label (rendered as legend) */
  label?: string;
  /** Layout direction (default: "vertical") */
  direction?: "vertical" | "horizontal";
  /** Disable all options (default: false) */
  disabled?: boolean;
  /** Optional className */
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  direction = "vertical",
  disabled = false,
  className = "",
}: RadioGroupProps) {
  const groupId = useId();

  const classes = [
    styles["radio-group"],
    direction === "horizontal" && styles["radio-group--horizontal"],
    disabled && styles["radio-group--disabled"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <fieldset
      className={classes}
      data-component="radio-group"
      role="radiogroup"
      aria-labelledby={label ? `${groupId}-legend` : undefined}
    >
      {label && (
        <legend
          id={`${groupId}-legend`}
          className={styles["radio-group__legend"]}
        >
          {label}
        </legend>
      )}
      <div className={styles["radio-group__list"]}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={[
                styles["radio-group__item"],
                isDisabled && styles["radio-group__item--disabled"],
              ]
                .filter(Boolean)
                .join(" ")}
              htmlFor={optionId}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange?.(option.value)}
                disabled={isDisabled}
                className={styles["radio-group__input"]}
              />
              <span
                className={styles["radio-group__circle"]}
                aria-hidden="true"
              />
              <span className={styles["radio-group__text"]}>
                <span className={styles["radio-group__label"]}>
                  {option.label}
                </span>
                {option.description && (
                  <span className={styles["radio-group__description"]}>
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DropdownMenu.module.scss";

export interface DropdownMenuItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect: (value: string) => void;
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  onSelect,
  align = "left",
  className = "",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
        e.preventDefault();
        setOpen(true);
        setHighlighted(0);
        return;
      }

      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlighted((prev) => {
            let next = prev + 1;
            while (next < items.length && items[next].disabled) next++;
            return next < items.length ? next : prev;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlighted((prev) => {
            let next = prev - 1;
            while (next >= 0 && items[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlighted >= 0 && !items[highlighted].disabled) {
            onSelect(items[highlighted].value);
            setOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [open, highlighted, items, onSelect],
  );

  // Scroll highlighted into view
  useEffect(() => {
    if (open && menuRef.current && highlighted >= 0) {
      const el = menuRef.current.children[highlighted] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted, open]);

  const wrapperClasses = [
    styles.dropdown,
    open && styles["dropdown--open"],
    align === "right" && styles["dropdown--right"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      ref={wrapperRef}
      data-component="dropdown"
    >
      <button
        type="button"
        className={styles.dropdown__trigger}
        onClick={() => {
          setOpen(!open);
          if (!open) setHighlighted(-1);
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>

      {open && (
        <ul
          ref={menuRef}
          className={styles.dropdown__menu}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, i) => {
            const itemClasses = [
              styles.dropdown__item,
              item.disabled && styles["dropdown__item--disabled"],
              item.danger && styles["dropdown__item--danger"],
              i === highlighted && styles["dropdown__item--highlighted"],
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                key={item.value}
                role="menuitem"
                className={itemClasses}
                aria-disabled={item.disabled || undefined}
                onClick={() => {
                  if (item.disabled) return;
                  onSelect(item.value);
                  setOpen(false);
                }}
                onMouseEnter={() => !item.disabled && setHighlighted(i)}
              >
                {item.icon && (
                  <span className={styles["dropdown__item-icon"]}>
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

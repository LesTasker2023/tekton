"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.scss";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when modal should close */
  onClose: () => void;
  /** Optional header title */
  title?: string;
  /** Modal width (default: "md") */
  size?: ModalSize;
  /** Hide the close button */
  hideClose?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Optional footer (confirm/cancel buttons etc) */
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  hideClose = false,
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else {
      dialog.close();
      previousFocus.current?.focus();
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  const handleCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.modal} ${styles[`modal--${size}`]}`}
      data-component="modal"
      data-size={size}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      aria-label={title || "Dialog"}
    >
      <div className={styles.modal__container}>
        {(title || !hideClose) && (
          <div className={styles.modal__header}>
            {title && <h2 className={styles.modal__title}>{title}</h2>}
            {!hideClose && (
              <button
                className={styles.modal__close}
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className={styles.modal__body}>{children}</div>
        {footer && <div className={styles.modal__footer}>{footer}</div>}
      </div>
    </dialog>
  );
}

"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import styles from "./Toast.module.scss";

export type ToastVariant = "info" | "success" | "warning" | "danger";

export interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
};

function ToastItem({
  data,
  onDismiss,
}: {
  data: ToastData;
  onDismiss: (id: string) => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(data.id), 300);
    }, data.duration);
    return () => clearTimeout(timerRef.current);
  }, [data.id, data.duration, onDismiss]);

  const handleDismiss = useCallback(() => {
    clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => onDismiss(data.id), 300);
  }, [data.id, onDismiss]);

  const Icon = ICONS[data.variant];

  return (
    <div
      className={`${styles.toast} ${styles[`toast--${data.variant}`]} ${exiting ? styles["toast--exiting"] : ""}`}
      role="alert"
      data-component="toast"
      data-variant={data.variant}
    >
      <Icon size={18} className={styles.toast__icon} />
      <span className={styles.toast__message}>{data.message}</span>
      <button
        className={styles.toast__close}
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

let idCounter = 0;

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toast = useCallback((options: ToastOptions) => {
    const id = `toast-${++idCounter}`;
    setToasts((prev) => [
      ...prev,
      {
        id,
        message: options.message,
        variant: options.variant ?? "info",
        duration: options.duration ?? 4000,
      },
    ]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className={styles.container} data-component="toast-container">
            {toasts.map((t) => (
              <ToastItem key={t.id} data={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

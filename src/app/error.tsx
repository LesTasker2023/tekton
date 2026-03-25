"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import styles from "./not-found.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.code}>500</p>
        <h1 className={styles.heading}>System Malfunction</h1>
        <p className={styles.message}>
          Something went wrong while processing your request. This has been
          logged and we&apos;ll look into it.
        </p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.primary}>
            Try Again
          </button>
          <a href="/" className={styles.secondary}>
            Return to Base
          </a>
        </div>
      </div>
    </div>
  );
}

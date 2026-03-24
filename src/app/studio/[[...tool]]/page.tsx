"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { StudioSplash } from "./StudioSplash";
import styles from "./Studio.module.scss";

export default function StudioPage() {
  return (
    <>
      <StudioSplash />
      <NextStudio config={config} />
      <Link href="/" className={styles.exitLink}>
        <LogOut size={16} />
        Exit
      </Link>
    </>
  );
}

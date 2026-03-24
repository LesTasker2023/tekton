import styles from "./Footer.module.scss";

interface FooterProps {
  text?: string;
}

export function Footer({ text }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = text
    ? text.replace("{year}", String(year))
    : `© ${year} Tekton. All rights reserved.`;

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>{copyright}</p>
    </footer>
  );
}

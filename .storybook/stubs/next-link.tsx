import React from "react";

/** Stub for next/link in Storybook — renders a plain <a> */
const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(function Link({ href, children, ...props }, ref) {
  return (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  );
});

export default Link;

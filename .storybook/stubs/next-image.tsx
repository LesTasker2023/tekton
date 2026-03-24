import React from "react";

/** Stub for next/image in Storybook — renders a plain <img> */
const Image = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    quality?: number;
  }
>(function Image({ fill, priority, quality, ...props }, ref) {
  const style: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : {};
  return <img ref={ref} style={style} {...props} />;
});

export default Image;

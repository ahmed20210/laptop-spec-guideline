"use client";

import { useState } from "react";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 36, className = "" }: BrandLogoProps): JSX.Element {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid place-items-center rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 font-bold text-white ${className}`}
        style={{ width: size, height: size }}
        aria-label="VA logo fallback"
      >
        VA
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="VA logo"
      width={size}
      height={size}
      className={`rounded-lg object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

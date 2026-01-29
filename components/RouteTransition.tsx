"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Hide immediately on route change
    setVisible(false);

    // 2. A slightly longer delay (100ms) ensures the new page 
    // is fully mounted before we start the long fade-in.
    const t = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          w-full will-change-opacity
          transition-opacity 
          duration-[2000ms] 
          ease-in-out
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
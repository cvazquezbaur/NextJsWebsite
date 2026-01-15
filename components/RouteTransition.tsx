"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './RouteTransition.module.css';

export default function RouteTransition({
  children,
  timeout = 700,
}: {
  children: React.ReactNode;
  timeout?: number;
}) {
  const pathname = usePathname() || '/';
  const [displayPath, setDisplayPath] = React.useState(pathname);
  const [visible, setVisible] = React.useState(false);

  // initial mount: fade in
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // handle route change: fade out, switch, fade in
  React.useEffect(() => {
    if (pathname === displayPath) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayPath(pathname);
      // allow next tick to mount then fade in
      requestAnimationFrame(() => setVisible(true));
    }, timeout);
    return () => clearTimeout(t);
  }, [pathname, displayPath, timeout]);

  return (
    <div className={styles.container}>
      <div
        key={displayPath}
        className={`${styles.page} ${visible ? styles.enter : styles.exit}`}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname() || "/";

  const navItems: Array<[string, string]> = [
    ["Home", "/"],
    ["About", "/about"],
    ["Tech", "/tech"],
    ["Performance", "/performance"],
    ["Outdoors", "/outdoors"],
    ["Contact", "/contact"],
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-col items-center bg-transparent py-3">
      <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-b from-black/70 via-black/40 to-black/30 rounded-full shadow-lg backdrop-blur-sm max-w-[90%]">
        <div className="hidden sm:flex items-center gap-3">
          {navItems.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm text-current opacity-90 px-2 py-1 rounded-md hover:bg-black/5 hover:opacity-100 ${isActive ? 'font-semibold bg-black/10 opacity-100' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden p-2 rounded-md text-current hover:bg-black/5"
        >
          {/* simple hamburger icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu below the bar */}
      {open && (
        <div className="sm:hidden mt-3 w-[92%] max-w-md bg-gradient-to-b from-black/70 via-black/40 to-black/30 rounded-xl p-3 shadow-md flex flex-col items-center gap-2">
          {navItems.map(([label, href]) => (
            <Link
              key={`m-${href}`}
              href={href}
              onClick={() => setOpen(false)}
              className={`w-full text-center py-2 rounded-md text-sm hover:bg-black/5 ${pathname === href ? 'font-semibold bg-black/10' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

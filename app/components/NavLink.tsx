"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  const baseClasses = "rounded-full px-4 py-2 text-sm font-semibold transition-colors";
  const activeClasses = "bg-amber-200 text-amber-900 shadow-sm";
  const inactiveClasses = "text-stone-600 hover:text-stone-900";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </Link>
  );
}

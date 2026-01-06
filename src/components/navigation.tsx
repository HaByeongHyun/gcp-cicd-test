"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Contact", href: "/contact-us" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          MyCompany
        </Link>
        <ul className="flex items-center gap-6">
          {navItems.map(({ href, title }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors hover:text-primary ${
                  pathname === href
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
          <li>
            <Button asChild>
              <Link href="/contact-us">Get Started</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Terbaru", href: "/terbaru" },
    { name: "Hiburan", href: "/hiburan" },
    { name: "Gaya Hidup", href: "/gaya-hidup" },
    { name: "Olahraga", href: "/olahraga" },
    { name: "Nasional", href: "/nasional" },
    { name: "Internasional", href: "/internasional" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-[var(--color-primary-500)] shadow-md py-4"
          : "bg-white py-6 border-b border-gray-100"
        }`}
    >
      <div className="mx-auto max-w-[1296px] flex items-center justify-between px-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.svg"
            alt="Berita Kini Logo"
            width={159}
            height={44}
            className={`transition-all ${isScrolled ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] font-medium transition-colors ${
                  // Logika warna saat di-scroll 
                  isScrolled
                    ? "text-white hover:text-gray-200 opacity-90 hover:opacity-100"
                    : isActive
                      ? "text-[var(--color-primary-500)] font-semibold"
                      : "text-[var(--color-dark-500)] hover:text-[var(--color-primary-500)]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            className={`transition-all h-8 w-auto md:h-11 ${isScrolled ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] font-medium transition-colors ${isScrolled
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

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden p-2 text-gray-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`h-7 w-7 ${isScrolled ? "text-white" : ""}`} />
          ) : (
            <Menu className={`h-7 w-7 ${isScrolled ? "text-white" : ""}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-4 gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[15px] font-semibold py-2 border-b border-gray-50 flex justify-between items-center ${isActive ? "text-[var(--color-primary-500)]" : "text-[#475569]"
                  }`}
              >
                {link.name}
                <ChevronRight className="h-4 w-4 opacity-30" />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
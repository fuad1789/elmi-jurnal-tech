"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SearchButton } from "@/components/ui/SearchButton";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.editorialBoard, href: "/editorial-board" },
    { label: t.nav.abstractingIndexing, href: "/abstracting-indexing" },
    { label: t.nav.aimsScope, href: "/aims-scope" },
    {
      label: t.nav.about,
      href: "#",
      children: [
        { label: t.nav.publicationEthics, href: "/about/publication-ethics" },
        { label: t.nav.authorGuidelines, href: "/about/author-guidelines" },
        { label: t.nav.publisher, href: "/about/publisher" },
        { label: t.nav.contact, href: "/about/contact" },
      ],
    },
    { label: t.nav.archives, href: "/archives" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-academic-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SDU</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Sumqait State University
              </p>
              <p className="text-xs text-gray-500">Scientific Journal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label,
                        )
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActive(item.children[0].href)
                          ? "text-academic-blue bg-blue-50"
                          : "text-gray-700 hover:text-academic-blue hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-4 py-2 text-sm ${
                              pathname === child.href
                                ? "text-academic-blue bg-blue-50"
                                : "text-gray-700 hover:text-academic-blue hover:bg-gray-50"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-academic-blue bg-blue-50"
                        : "text-gray-700 hover:text-academic-blue hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <SearchButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label,
                        )
                      }
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-3 py-2 text-sm ${
                              pathname === child.href
                                ? "text-academic-blue bg-blue-50"
                                : "text-gray-600 hover:text-academic-blue"
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? "text-academic-blue bg-blue-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <Link
                href="/admin"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-academic-blue rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Admin Panel
              </Link>
              <LanguageSwitcher />
              <SearchButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

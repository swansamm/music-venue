"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AuthForms } from "./auth-forms";
import { User, LogOut, Heart, History, UserCog } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shows", label: "Shows" },
    { href: "/calendar", label: "Calendar" },
    { href: "/gallery", label: "Gallery" },
    { href: "/booking", label: "Booking" },
    { href: "/archive", label: "Archive" },
    { href: "/store", label: "Merch" },
    { href: "/contact", label: "Contact" },
    { href: "/artist-portal", label: "Artist Portal" },
    { href: "/admin", label: "Admin" }
  ];

  const userLinks = [
    { href: "/profile", label: "My Profile", icon: UserCog },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/tickets", label: "My Tickets", icon: History },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group" onClick={closeMenu}>
            <div className="relative w-32 h-20">
              <svg width="128" height="80" viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full group-hover:scale-105 transition-transform duration-200">
                {/* Swan outline */}
                <path d="M60 75C60 75 50 65 40 68C30 71 24 83 30 93C36 103 50 100 60 95" stroke="#333" strokeWidth="3" fill="none"/>
                <path d="M60 75C60 75 70 60 90 52C110 44 130 48 140 60C150 72 144 88 130 92C116 96 100 88 90 78" stroke="#333" strokeWidth="3" fill="none"/>
                <path d="M90 78C90 78 110 70 130 73C150 76 160 88 156 98C152 108 140 105 130 98" stroke="#333" strokeWidth="3" fill="none"/>

                {/* Swan head */}
                <circle cx="36" cy="70" r="4" fill="#333"/>
                <path d="M30 65C30 65 24 62 20 65" stroke="#FF6B35" strokeWidth="3" fill="none"/>

                {/* Teal banner */}
                <rect x="20" y="95" width="160" height="25" fill="#20B2AA" rx="3"/>

                {/* Text */}
                <text x="45" y="112" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#FF6B35">SWAN DIVE</text>
              </svg>
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex flex-col justify-center items-center group"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-teal-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-teal-600 transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-teal-600 transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" onClick={closeMenu}></div>
      )}

      {/* Hamburger Menu - Compact Version */}
      <div className={`fixed top-0 right-0 h-full w-48 bg-white/98 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-3 pt-16">
          <div className="space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block py-1.5 px-2 text-sm font-medium transition-all duration-200 rounded ${
                  pathname === link.href
                    ? "text-teal-600"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Authentication Section */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            {user ? (
              <div>
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {userLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 py-1.5 px-2 text-sm font-medium transition-all duration-200 rounded ${
                          pathname === link.href
                            ? "text-teal-600"
                            : "text-gray-700 hover:text-teal-600"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center gap-2 py-1.5 px-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-all duration-200 rounded w-full text-left"
                  >
                    <LogOut className="w-3 h-3" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowAuthForms(true);
                    closeMenu();
                  }}
                  className="w-full py-1.5 px-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200 rounded"
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Quick Contact - Compact */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Contact
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600">(503) 227-7777</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">SE Grand Ave</span>
              </div>
            </div>
          </div>

          {/* Social Links - Compact */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="flex gap-1.5">
              <a href="https://facebook.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                 className="w-5 h-5 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                 className="w-5 h-5 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.489-3.326-1.295a.75.75 0 01.375-1.342c.178-.024.355-.047.534-.047 1.297 0 2.448.488 3.326 1.294a.75.75 0 01-.375 1.342c-.178.024-.356.048-.534.048z"/>
                </svg>
              </a>
              <a href="https://twitter.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                 className="w-5 h-5 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@swandivepdx" target="_blank" rel="noopener noreferrer"
                 className="w-5 h-5 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Forms Modal */}
      {showAuthForms && (
        <AuthForms onClose={() => setShowAuthForms(false)} />
      )}
    </nav>
  );
}

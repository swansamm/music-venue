"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex flex-col items-center space-y-2 group">
            <div className="relative w-16 h-12">
              <svg width="64" height="48" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 45C30 45 25 40 20 42C15 44 12 50 15 55C18 60 25 58 30 55" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M30 45C30 45 35 35 45 30C55 25 65 28 70 35C75 42 72 50 65 52C58 54 50 50 45 45" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M45 45C45 45 55 40 65 42C75 44 80 50 78 55C76 60 70 58 65 55" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="42" r="3" fill="#333"/>
                <path d="M15 40C15 40 12 38 10 40" stroke="#FF6B35" strokeWidth="2" fill="none"/>
                <rect x="10" y="55" width="100" height="20" fill="#20B2AA" rx="2"/>
                <text x="35" y="68" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">SWAN DIVE</text>
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
              Swan Dive PDX
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                className={`text-sm font-medium transition-all ${
                  pathname === "/"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                Shows
              </Button>
            </Link>
            <Link href="/calendar">
              <Button
                variant={pathname === "/calendar" ? "default" : "ghost"}
                className={`text-sm font-medium transition-all ${
                  pathname === "/calendar"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                Calendar
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                variant={pathname === "/admin" ? "default" : "ghost"}
                className={`text-sm font-medium transition-all ${
                  pathname === "/admin"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { VENUE_INFO } from "@/lib/types";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Venue Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-8">
                <svg width="48" height="32" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 45C30 45 25 40 20 42C15 44 12 50 15 55C18 60 25 58 30 55" stroke="#fff" strokeWidth="2" fill="none"/>
                  <path d="M30 45C30 45 35 35 45 30C55 25 65 28 70 35C75 42 72 50 65 52C58 54 50 50 45 45" stroke="#fff" strokeWidth="2" fill="none"/>
                  <path d="M45 45C45 45 55 40 65 42C75 44 80 50 78 55C76 60 70 58 65 55" stroke="#fff" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="42" r="3" fill="#fff"/>
                  <path d="M15 40C15 40 12 38 10 40" stroke="#20B2AA" strokeWidth="2" fill="none"/>
                  <rect x="10" y="55" width="100" height="20" fill="#20B2AA" rx="2"/>
                  <text x="35" y="68" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">SWAN DIVE</text>
                </svg>
              </div>
              <h3 className="text-xl font-bold">{VENUE_INFO.name}</h3>
            </div>
            <p className="text-gray-300 mb-4">{VENUE_INFO.description}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Address</p>
                  <p>{VENUE_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href={`tel:${VENUE_INFO.phone}`} className="hover:text-teal-400 transition-colors">
                    {VENUE_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Visit Us</h4>
            <div className="space-y-3 text-gray-300 mb-6">
              <div>
                <p className="font-medium mb-1">Typical Hours</p>
                <p className="text-sm">Show times vary by event</p>
                <p className="text-sm">Check individual show listings</p>
              </div>
              <div>
                <p className="font-medium mb-1">Capacity</p>
                <p className="text-sm">{VENUE_INFO.capacity} guests</p>
              </div>
              <div>
                <p className="font-medium mb-1">Parking</p>
                <p className="text-sm">Street parking available</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a href="https://facebook.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.489-3.326-1.295a.75.75 0 01.375-1.342c.178-.024.355-.047.534-.047 1.297 0 2.448.488 3.326 1.294a.75.75 0 01-.375 1.342c-.178.024-.356.048-.534.048zm3.518 0c-1.297 0-2.448-.489-3.326-1.295a.75.75 0 01.375-1.342c.178-.024.355-.047.534-.047 1.297 0 2.448.488 3.326 1.294a.75.75 0 01-.375 1.342c-.178.024-.356.048-.534.048z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/swandivepdx" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@swandivepdx" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 {VENUE_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>Portland's Premier Live Music Venue</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

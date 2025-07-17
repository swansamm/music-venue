"use client";

import { useState, useEffect } from "react";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { ShowCard } from "@/components/show-card";
import { VENUE_INFO } from "@/lib/types";

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    setShows(getShows());
  }, []);

  const upcomingShows = shows
    .filter(show => new Date(show.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                <span className="block">Swan Dive</span>
                <span className="block text-teal-400">PDX</span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                  {VENUE_INFO.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{VENUE_INFO.address}</span>
              </div>
              <div className="hidden sm:block text-gray-500">•</div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{VENUE_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C120,100 240,80 480,80 C720,80 840,100 960,80 C1080,60 1120,80 1200,100 L1200,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Shows Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Shows
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience live music like never before in Portland's most intimate venue
          </p>
        </div>

        {upcomingShows.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Shows Scheduled</h3>
            <p className="text-gray-500 text-lg">Check back soon for upcoming performances</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

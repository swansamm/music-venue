"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

// Genre variations for the homepage
const genreVariations = [
  {
    id: "electronic",
    title: "Electronic Vibes",
    background: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop&q=80",
    backgroundMobile: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=768&h=1024&fit=crop&q=80",
    accent: "text-teal-400",
    description: "Cutting-edge electronic beats and synthesized soundscapes"
  },
  {
    id: "jazz",
    title: "Jazz Sessions",
    background: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1920&h=1080&fit=crop&q=80",
    backgroundMobile: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=768&h=1024&fit=crop&q=80",
    accent: "text-amber-400",
    description: "Smooth jazz melodies and improvised performances"
  },
  {
    id: "rock",
    title: "Rock Energy",
    background: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&h=1080&fit=crop&q=80",
    backgroundMobile: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=768&h=1024&fit=crop&q=80",
    accent: "text-red-400",
    description: "High-energy rock performances and electric guitar solos"
  },
  {
    id: "indie",
    title: "Indie Showcase",
    background: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1920&h=1080&fit=crop&q=80",
    backgroundMobile: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=768&h=1024&fit=crop&q=80",
    accent: "text-purple-400",
    description: "Independent artists and alternative music experiences"
  },
  {
    id: "acoustic",
    title: "Intimate Shows",
    background: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop&q=80",
    backgroundMobile: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=768&h=1024&fit=crop&q=80",
    accent: "text-green-400",
    description: "Acoustic performances and storytelling through music"
  }
];

export default function Home() {
  const [currentGenre, setCurrentGenre] = useState(genreVariations[0]);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Select random genre variation on mount
  useEffect(() => {
    const randomGenre = genreVariations[Math.floor(Math.random() * genreVariations.length)];
    setCurrentGenre(randomGenre);
  }, []);

  // Simple parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const offsetX = (clientX / innerWidth - 0.5) * 20;
      const offsetY = (clientY / innerHeight - 0.5) * 20;

      setParallaxOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {/* Full Screen Hero Section with Optimized Background */}
      <div className="relative h-full">
        {/* Optimized Background Image with Parallax */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${typeof window !== 'undefined' && window.innerWidth <= 768 ? currentGenre.backgroundMobile : currentGenre.background}')`,
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) scale(1.1)`
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
                <span className="block">Swan Dive</span>
                <span className={`block ${currentGenre.accent}`}>PDX</span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-2xl md:text-3xl text-gray-200 font-light leading-relaxed">
                  Portland's premier live music venue featuring intimate performances and unforgettable nights.
                </p>
              </div>
              <div className="mt-8">
                <p className={`text-xl md:text-2xl ${currentGenre.accent} font-medium`}>
                  {currentGenre.title}
                </p>
                <p className="text-lg text-gray-300 mt-2">
                  {currentGenre.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link href="/shows">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
                    View Shows
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
                    Show Calendar
                  </Button>
                </Link>
              </div>

              {/* Venue Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${currentGenre.accent}`}>500</div>
                  <div className="text-sm md:text-base text-gray-300">Capacity</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${currentGenre.accent}`}>8+</div>
                  <div className="text-sm md:text-base text-gray-300">Years</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${currentGenre.accent}`}>250+</div>
                  <div className="text-sm md:text-base text-gray-300">Shows</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${currentGenre.accent}`}>300+</div>
                  <div className="text-sm md:text-base text-gray-300">Artists</div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-6 mt-12">
                <a
                  href="https://facebook.com/swandivepdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-400 transition-all duration-300 hover:scale-125"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-8 h-8" />
                </a>
                <a
                  href="https://instagram.com/swandivepdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-400 transition-all duration-300 hover:scale-125"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-8 h-8" />
                </a>
                <a
                  href="https://twitter.com/swandivepdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-400 transition-all duration-300 hover:scale-125"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-8 h-8" />
                </a>
                <a
                  href="https://youtube.com/@swandivepdx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-400 transition-all duration-300 hover:scale-125"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Navigation Dots - Click to change genre */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {genreVariations.map((genre, index) => (
            <button
              key={genre.id}
              onClick={() => setCurrentGenre(genre)}
              className={`w-3 h-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                genre.id === currentGenre.id
                  ? `scale-125 ${currentGenre.accent.replace('text-', 'bg-')}`
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Switch to ${genre.title}`}
            />
          ))}
        </div>

        {/* Preload images for better performance */}
        <div className="hidden">
          {genreVariations.map((genre) => (
            <div key={`preload-${genre.id}`}>
              <img src={genre.background} alt="" />
              <img src={genre.backgroundMobile} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

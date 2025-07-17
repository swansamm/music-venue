"use client";

import { Show } from "./types";

const SHOWS_STORAGE_KEY = "music-venue-shows";

// Sample data
const sampleShows: Show[] = [
  {
    id: "1",
    title: "Electric Night",
    artist: "The Synth Collective",
    date: "2025-07-25",
    time: "20:00",
    venue: "Main Stage",
    description: "An electrifying night of synthesized beats and electronic melodies that will take you on a journey through sound.",
    genre: "Electronic",
    price: 45,
    ticketUrl: "https://example.com/tickets/1",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "2",
    title: "Jazz Under Stars",
    artist: "Blue Moon Quartet",
    date: "2025-07-30",
    time: "19:30",
    venue: "Outdoor Pavilion",
    description: "A smooth jazz evening under the stars featuring the renowned Blue Moon Quartet.",
    genre: "Jazz",
    price: 35,
    ticketUrl: "https://example.com/tickets/2",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    capacity: 300,
    soldOut: false,
  },
  {
    id: "3",
    title: "Rock Revival",
    artist: "Thunder & Lightning",
    date: "2025-08-05",
    time: "21:00",
    venue: "Main Stage",
    description: "High-energy rock performance that will blow you away with classic and modern rock anthems.",
    genre: "Rock",
    price: 50,
    ticketUrl: "https://example.com/tickets/3",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: true,
  },
];

export function getShows(): Show[] {
  if (typeof window === "undefined") return sampleShows;

  const stored = localStorage.getItem(SHOWS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(sampleShows));
    return sampleShows;
  }
  return JSON.parse(stored);
}

export function saveShow(show: Omit<Show, "id">): Show {
  const shows = getShows();
  const newShow: Show = {
    ...show,
    id: Date.now().toString(),
  };
  shows.push(newShow);
  localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(shows));
  return newShow;
}

export function updateShow(id: string, updatedShow: Partial<Show>): Show | null {
  const shows = getShows();
  const index = shows.findIndex(show => show.id === id);
  if (index === -1) return null;

  shows[index] = { ...shows[index], ...updatedShow };
  localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(shows));
  return shows[index];
}

export function deleteShow(id: string): boolean {
  const shows = getShows();
  const filteredShows = shows.filter(show => show.id !== id);
  localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(filteredShows));
  return filteredShows.length < shows.length;
}

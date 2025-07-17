"use client";

import { Show } from "./types";

const SHOWS_STORAGE_KEY = "music-venue-shows";

// Sample data
const sampleShows: Show[] = [
  // February 2025
  {
    id: "1",
    title: "Electric Dreams Tour",
    artist: "Neon Synthesis",
    date: "2025-02-15",
    time: "20:00",
    venue: "Main Stage",
    description: "Experience cutting-edge electronic music with stunning visual effects. Neon Synthesis brings their acclaimed tour to Portland.",
    genre: "Electronic",
    price: 35,
    ticketUrl: "https://tickets.swandivepdx.com/neon-synthesis",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "2",
    title: "Jazz Under Stars",
    artist: "Portland Jazz Collective",
    date: "2025-02-22",
    time: "19:30",
    venue: "Intimate Room",
    description: "An evening of smooth jazz featuring the best local musicians. Intimate setting with premium acoustics.",
    genre: "Jazz",
    price: 28,
    ticketUrl: "https://tickets.swandivepdx.com/jazz-collective",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    capacity: 150,
    soldOut: true,
  },
  // March 2025
  {
    id: "3",
    title: "Rock Revival Night",
    artist: "Thunder & Lightning",
    date: "2025-03-01",
    time: "21:00",
    venue: "Main Stage",
    description: "High-energy rock performance that will blow you away. Classic rock meets modern energy.",
    genre: "Rock",
    price: 32,
    ticketUrl: "https://tickets.swandivepdx.com/thunder-lightning",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "4",
    title: "Indie Showcase Night",
    artist: "The Portland Sound",
    date: "2025-03-08",
    time: "20:30",
    venue: "Main Stage",
    description: "Discover the next generation of indie artists. Three bands, one unforgettable night.",
    genre: "Indie",
    price: 24,
    ticketUrl: "https://tickets.swandivepdx.com/indie-showcase",
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "5",
    title: "Folk Tales & Melodies",
    artist: "Mountain River Band",
    date: "2025-03-15",
    time: "19:00",
    venue: "Intimate Room",
    description: "Acoustic storytelling and beautiful melodies in our most intimate setting. Connect with the music.",
    genre: "Folk",
    price: 22,
    ticketUrl: "https://tickets.swandivepdx.com/mountain-river",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
    capacity: 150,
    soldOut: false,
  },
  {
    id: "6",
    title: "Hip-Hop Underground",
    artist: "Portland Cypher Collective",
    date: "2025-03-22",
    time: "21:30",
    venue: "Main Stage",
    description: "Raw, authentic hip-hop from Portland's underground scene. Real music, real stories.",
    genre: "Hip-Hop",
    price: 26,
    ticketUrl: "https://tickets.swandivepdx.com/hip-hop-underground",
    imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "7",
    title: "Acoustic Sessions",
    artist: "Sarah Moon & The Starlight",
    date: "2025-03-29",
    time: "19:30",
    venue: "Intimate Room",
    description: "Intimate acoustic performance featuring original songs and reimagined classics.",
    genre: "Folk",
    price: 20,
    ticketUrl: "https://tickets.swandivepdx.com/sarah-moon",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
    capacity: 150,
    soldOut: false,
  },
  // April 2025
  {
    id: "8",
    title: "Techno Night: Future Sound",
    artist: "Digital Pulse",
    date: "2025-04-05",
    time: "22:00",
    venue: "Main Stage",
    description: "Late-night techno experience with immersive lighting and sound design.",
    genre: "Electronic",
    price: 40,
    ticketUrl: "https://tickets.swandivepdx.com/digital-pulse",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "9",
    title: "Alternative Rock Showcase",
    artist: "Rebel Heart",
    date: "2025-04-12",
    time: "20:00",
    venue: "Main Stage",
    description: "Alternative rock with emotional depth and powerful vocals. A night of raw musical expression.",
    genre: "Rock",
    price: 30,
    ticketUrl: "https://tickets.swandivepdx.com/rebel-heart",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "10",
    title: "Jazz Fusion Experience",
    artist: "The Portland Fusion Project",
    date: "2025-04-19",
    time: "20:30",
    venue: "Main Stage",
    description: "Contemporary jazz fusion blending traditional jazz with modern elements.",
    genre: "Jazz",
    price: 38,
    ticketUrl: "https://tickets.swandivepdx.com/fusion-project",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "11",
    title: "Country Roads",
    artist: "West Coast Country",
    date: "2025-04-26",
    time: "19:00",
    venue: "Outdoor Pavilion",
    description: "Modern country music with classic storytelling. Perfect for a spring evening.",
    genre: "Country",
    price: 25,
    ticketUrl: "https://tickets.swandivepdx.com/west-coast-country",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&h=600&fit=crop",
    capacity: 300,
    soldOut: false,
  },
  // May 2025
  {
    id: "12",
    title: "Reggae Vibes",
    artist: "Island Rhythm",
    date: "2025-05-03",
    time: "20:00",
    venue: "Outdoor Pavilion",
    description: "Feel-good reggae music to kick off the summer season. Positive vibes only.",
    genre: "Reggae",
    price: 28,
    ticketUrl: "https://tickets.swandivepdx.com/island-rhythm",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    capacity: 300,
    soldOut: false,
  },
  {
    id: "13",
    title: "Blues Night",
    artist: "Portland Blues Society",
    date: "2025-05-10",
    time: "19:30",
    venue: "Intimate Room",
    description: "Traditional blues with modern interpretations. Soulful music in an intimate setting.",
    genre: "Blues",
    price: 24,
    ticketUrl: "https://tickets.swandivepdx.com/blues-society",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    capacity: 150,
    soldOut: false,
  },
  {
    id: "14",
    title: "Pop Punk Revival",
    artist: "Generation Next",
    date: "2025-05-17",
    time: "21:00",
    venue: "Main Stage",
    description: "High-energy pop punk bringing back the early 2000s vibe with a modern twist.",
    genre: "Rock",
    price: 29,
    ticketUrl: "https://tickets.swandivepdx.com/generation-next",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    capacity: 500,
    soldOut: false,
  },
  {
    id: "15",
    title: "World Music Festival",
    artist: "Global Sounds Collective",
    date: "2025-05-24",
    time: "18:00",
    venue: "Outdoor Pavilion",
    description: "Celebrate diversity through music from around the world. Multiple artists, one unforgettable evening.",
    genre: "World",
    price: 35,
    ticketUrl: "https://tickets.swandivepdx.com/global-sounds",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    capacity: 300,
    soldOut: false,
  },
  {
    id: "16",
    title: "Experimental Electronic",
    artist: "Sound Laboratory",
    date: "2025-05-31",
    time: "22:30",
    venue: "Intimate Room",
    description: "Push the boundaries of electronic music. An experimental journey through sound and space.",
    genre: "Electronic",
    price: 32,
    ticketUrl: "https://tickets.swandivepdx.com/sound-laboratory",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    capacity: 150,
    soldOut: false,
  },
  {
    id: "17",
    title: "Summer Kickoff Party",
    artist: "Various Artists",
    date: "2025-06-07",
    time: "17:00",
    venue: "Outdoor Pavilion",
    description: "Multi-artist celebration to kick off summer. Food trucks, drinks, and amazing music all day.",
    genre: "Mixed",
    price: 45,
    ticketUrl: "https://tickets.swandivepdx.com/summer-kickoff",
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
    capacity: 300,
    soldOut: true,
  }
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

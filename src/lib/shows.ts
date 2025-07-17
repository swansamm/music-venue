import { Show, ShowFormData } from '@/types/show';

const SHOWS_STORAGE_KEY = 'music-venue-shows';

// Sample data for initial load
const sampleShows: Show[] = [
  {
    id: '1',
    artistName: 'The Electric Wolves',
    date: '2025-07-25',
    time: '20:00',
    venue: 'Main Stage',
    description: 'An electrifying rock performance featuring their latest album tracks.',
    ticketPrice: 45,
    ticketUrl: 'https://tickets.example.com/electric-wolves',
    genre: 'Rock',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    artistName: 'Jazz Collective',
    date: '2025-07-30',
    time: '19:30',
    venue: 'Intimate Lounge',
    description: 'A smooth evening of contemporary jazz with special guest musicians.',
    ticketPrice: 35,
    ticketUrl: 'https://tickets.example.com/jazz-collective',
    genre: 'Jazz',
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    artistName: 'Indie Dreams',
    date: '2025-08-05',
    time: '21:00',
    venue: 'Main Stage',
    description: 'Rising indie band with dreamy melodies and heartfelt lyrics.',
    ticketPrice: 30,
    ticketUrl: 'https://tickets.example.com/indie-dreams',
    genre: 'Indie',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=300&fit=crop'
  }
];

export const getShows = (): Show[] => {
  if (typeof window === 'undefined') return sampleShows;

  try {
    const stored = localStorage.getItem(SHOWS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(sampleShows));
      return sampleShows;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading shows:', error);
    return sampleShows;
  }
};

export const saveShows = (shows: Show[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(shows));
  } catch (error) {
    console.error('Error saving shows:', error);
  }
};

export const addShow = (showData: ShowFormData, imageUrl?: string): Show => {
  const shows = getShows();
  const newShow: Show = {
    id: Date.now().toString(),
    ...showData,
    ticketPrice: parseFloat(showData.ticketPrice),
    imageUrl,
  };

  const updatedShows = [...shows, newShow];
  saveShows(updatedShows);
  return newShow;
};

export const getShowById = (id: string): Show | undefined => {
  const shows = getShows();
  return shows.find(show => show.id === id);
};

export const deleteShow = (id: string): void => {
  const shows = getShows();
  const updatedShows = shows.filter(show => show.id !== id);
  saveShows(updatedShows);
};

export const updateShow = (id: string, updates: Partial<Show>): void => {
  const shows = getShows();
  const updatedShows = shows.map(show =>
    show.id === id ? { ...show, ...updates } : show
  );
  saveShows(updatedShows);
};

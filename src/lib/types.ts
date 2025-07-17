export interface Show {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  genre: string;
  price: number;
  ticketUrl: string;
  imageUrl: string;
  capacity: number;
  soldOut: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  favorites: string[]; // Array of show IDs
  ticketHistory: TicketPurchase[];
  newsletterSubscribed: boolean;
  profileImage?: string;
}

export interface TicketPurchase {
  id: string;
  showId: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: 'confirmed' | 'cancelled' | 'refunded';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribedAt: string;
  active: boolean;
  preferences: {
    genres: string[];
    frequency: 'weekly' | 'monthly' | 'events-only';
  };
}

export interface ShowPhoto {
  id: string;
  showId: string;
  url: string;
  caption?: string;
  uploadedBy: string; // user ID or 'venue'
  uploadedAt: string;
  approved: boolean;
}

export interface ArtistSubmission {
  id: string;
  artistName: string;
  contactName: string;
  email: string;
  phone: string;
  genre: string;
  description: string;
  website?: string;
  socialMedia?: string;
  musicSamples: string;
  preferredDates: string;
  priceRange: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'scheduled';
  notes?: string;
}

export const VENUE_INFO = {
  name: "Swan Dive PDX",
  address: "727 SE Grand Ave, Portland, OR 97214",
  phone: "(503) 227-7777",
  email: "info@swandivepdx.com",
  capacity: 500,
  description: "Portland's premier live music venue featuring intimate performances and unforgettable nights.",
};

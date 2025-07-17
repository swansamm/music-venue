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
  imageUrl?: string;
  capacity: number;
  soldOut: boolean;
}

export interface VenueInfo {
  name: string;
  address: string;
  phone: string;
  description: string;
  capacity: number;
}

export const VENUE_INFO: VenueInfo = {
  name: "Swan Dive PDX",
  address: "727 SE Grand Ave, Portland, OR 97214",
  phone: "(503) 227-7777",
  description: "Portland's premier live music venue featuring intimate performances and unforgettable nights.",
  capacity: 500,
};

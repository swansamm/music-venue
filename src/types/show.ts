export interface Show {
  id: string;
  artistName: string;
  date: string; // ISO date string
  time: string; // "HH:MM" format
  venue: string;
  description: string;
  ticketPrice: number;
  ticketUrl: string;
  imageUrl?: string;
  genre?: string;
  soldOut?: boolean;
}

export interface ShowFormData {
  artistName: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  ticketPrice: string;
  ticketUrl: string;
  genre: string;
}

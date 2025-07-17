"use client";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from './firebase';
import { Show } from './types';

// Collection reference
const showsCollection = collection(db, 'shows');

// Sample data for initialization
const sampleShows: Omit<Show, 'id'>[] = [
  {
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

// Get all shows
export async function getShows(): Promise<Show[]> {
  try {
    const q = query(showsCollection, orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Initialize with sample data if no shows exist
      await initializeSampleData();
      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Show[];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Show[];
  } catch (error) {
    console.error('Error getting shows:', error);
    return [];
  }
}

// Listen to real-time updates for shows
export function onShowsChange(callback: (shows: Show[]) => void) {
  const q = query(showsCollection, orderBy('date', 'asc'));

  return onSnapshot(q, (querySnapshot) => {
    const shows = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Show[];
    callback(shows);
  });
}

// Add a new show
export async function saveShow(showData: Omit<Show, 'id'>): Promise<Show> {
  try {
    const docRef = await addDoc(showsCollection, {
      ...showData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return {
      id: docRef.id,
      ...showData
    };
  } catch (error) {
    console.error('Error saving show:', error);
    throw error;
  }
}

// Update an existing show
export async function updateShow(id: string, updatedShow: Partial<Show>): Promise<Show | null> {
  try {
    const showDoc = doc(db, 'shows', id);
    await updateDoc(showDoc, {
      ...updatedShow,
      updatedAt: Timestamp.now()
    });

    // Return updated show (you might want to fetch it fresh)
    const shows = await getShows();
    return shows.find(show => show.id === id) || null;
  } catch (error) {
    console.error('Error updating show:', error);
    return null;
  }
}

// Delete a show
export async function deleteShow(id: string): Promise<boolean> {
  try {
    const showDoc = doc(db, 'shows', id);
    await deleteDoc(showDoc);
    return true;
  } catch (error) {
    console.error('Error deleting show:', error);
    return false;
  }
}

// Upload image to Firebase Storage
export async function uploadShowImage(file: File, showId?: string): Promise<string> {
  try {
    const filename = showId ? `show-${showId}-${Date.now()}` : `show-${Date.now()}`;
    const imageRef = ref(storage, `show-images/${filename}`);

    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Delete image from Firebase Storage
export async function deleteShowImage(imageUrl: string): Promise<boolean> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

// Initialize sample data
async function initializeSampleData(): Promise<void> {
  try {
    const promises = sampleShows.map(show => saveShow(show));
    await Promise.all(promises);
    console.log('Sample data initialized');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

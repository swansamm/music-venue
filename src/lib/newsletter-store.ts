"use client";

import { NewsletterSubscriber } from "./types";

const NEWSLETTER_STORAGE_KEY = "swan-dive-newsletter";

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveNewsletterSubscriber(subscriber: Omit<NewsletterSubscriber, 'id' | 'subscribedAt'>): NewsletterSubscriber {
  const subscribers = getNewsletterSubscribers();

  // Check if email already exists
  const existingIndex = subscribers.findIndex(s => s.email === subscriber.email);

  if (existingIndex !== -1) {
    // Update existing subscriber
    subscribers[existingIndex] = {
      ...subscribers[existingIndex],
      ...subscriber,
      active: true
    };
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
    return subscribers[existingIndex];
  } else {
    // Create new subscriber
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id: `newsletter-${Date.now()}`,
      subscribedAt: new Date().toISOString(),
      active: true
    };

    subscribers.push(newSubscriber);
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
    return newSubscriber;
  }
}

export function unsubscribeFromNewsletter(email: string): boolean {
  const subscribers = getNewsletterSubscribers();
  const index = subscribers.findIndex(s => s.email === email);

  if (index !== -1) {
    subscribers[index].active = false;
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
    return true;
  }
  return false;
}

export function updateNewsletterPreferences(email: string, preferences: NewsletterSubscriber['preferences']): boolean {
  const subscribers = getNewsletterSubscribers();
  const index = subscribers.findIndex(s => s.email === email);

  if (index !== -1) {
    subscribers[index].preferences = preferences;
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
    return true;
  }
  return false;
}

export function getNewsletterStats() {
  const subscribers = getNewsletterSubscribers();
  const active = subscribers.filter(s => s.active);

  return {
    total: subscribers.length,
    active: active.length,
    byGenre: active.reduce((acc, sub) => {
      sub.preferences.genres.forEach(genre => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    byFrequency: active.reduce((acc, sub) => {
      acc[sub.preferences.frequency] = (acc[sub.preferences.frequency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}

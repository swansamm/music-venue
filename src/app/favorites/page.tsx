"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Clock, MapPin, Ticket, HeartOff } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function FavoritesPage() {
  const { user, removeFromFavorites } = useAuth();
  const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      redirect("/");
      return;
    }

    const allShows = getShows();
    const userFavorites = allShows.filter(show => user.favorites.includes(show.id));
    setFavoriteShows(userFavorites);
    setLoading(false);
  }, [user]);

  if (!user) {
    return null;
  }

  const handleRemoveFavorite = (showId: string) => {
    removeFromFavorites(showId);
    setFavoriteShows(prev => prev.filter(show => show.id !== showId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-red-500" />
            My Favorite Shows
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of the shows you're most excited about
          </p>
        </div>

        {favoriteShows.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartOff className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 text-lg mb-8">
              Start adding shows to your favorites by clicking the heart icon on any show page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shows">
                <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                  Browse Shows
                </Button>
              </Link>
              <Link href="/calendar">
                <Button variant="outline" className="px-8 py-3">
                  View Calendar
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{favoriteShows.length}</div>
                  <div className="text-sm text-gray-600">Favorite Shows</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    {favoriteShows.filter(show => new Date(show.date) >= new Date()).length}
                  </div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    {new Set(favoriteShows.map(show => show.genre)).size}
                  </div>
                  <div className="text-sm text-gray-600">Genres</div>
                </CardContent>
              </Card>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteShows
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((show) => (
                <Card key={show.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={show.imageUrl}
                      alt={show.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {show.genre}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleRemoveFavorite(show.id)}
                        className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    {show.soldOut && (
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="destructive">Sold Out</Badge>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="text-white">
                        <p className="text-sm font-medium">{formatDate(show.date)}</p>
                        <p className="text-sm">{formatTime(show.time)} • {show.venue}</p>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{show.title}</CardTitle>
                    <p className="text-lg text-gray-600 font-medium">{show.artist}</p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">{show.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(show.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(show.time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{show.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Ticket className="w-4 h-4" />
                        <span className="font-semibold text-teal-600">${show.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link href={`/show/${show.id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      {!show.soldOut && (
                        <Button
                          className="w-full bg-teal-600 hover:bg-teal-700"
                          onClick={() => window.open(show.ticketUrl, '_blank')}
                        >
                          Buy Tickets
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Discover More Amazing Shows
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Keep exploring our lineup to find your next favorite performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shows">
                  <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                    Browse All Shows
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3">
                    View Calendar
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

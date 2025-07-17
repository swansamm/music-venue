"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter } from "lucide-react";

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const allShows = getShows();
    setShows(allShows);
    setFilteredShows(allShows);
  }, []);

  useEffect(() => {
    let filtered = shows;

    // Filter by genre
    if (selectedGenre !== "All") {
      filtered = filtered.filter(show => show.genre === selectedGenre);
    }

    // Filter by search query (artist name or show title)
    if (searchQuery) {
      filtered = filtered.filter(show =>
        show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        show.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(show => {
        const showDate = new Date(show.date);
        const filterDate = new Date(dateFilter);
        return showDate >= filterDate;
      });
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredShows(filtered);
  }, [shows, selectedGenre, searchQuery, dateFilter]);

  const genres = ["All", ...Array.from(new Set(shows.map(show => show.genre)))];

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

  const clearFilters = () => {
    setSelectedGenre("All");
    setSearchQuery("");
    setDateFilter("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Shows
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the best live music Portland has to offer. From intimate acoustic sets to high-energy performances.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by artist name or show title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-teal-500 rounded-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Genre:</span>
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={selectedGenre === genre ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  {genre}
                </Button>
              ))}
            </div>

            {/* Date Filter */}
            <div className="flex gap-2 items-center">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">From date:</span>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-auto"
              />
            </div>

            {/* Clear Filters */}
            {(selectedGenre !== "All" || searchQuery || dateFilter) && (
              <Button variant="ghost" onClick={clearFilters} className="text-teal-600 hover:text-teal-700">
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-600">
              Showing {filteredShows.length} of {shows.length} shows
              {searchQuery && ` for "${searchQuery}"`}
              {selectedGenre !== "All" && ` in ${selectedGenre}`}
            </p>
          </div>
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShows.map((show) => (
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
                {show.soldOut && (
                  <div className="absolute top-4 right-4">
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

                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-teal-600">
                    ${show.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Capacity: {show.capacity}
                  </div>
                </div>

                <div className="space-y-2">
                  {show.soldOut ? (
                    <Button disabled className="w-full bg-gray-400">
                      Sold Out
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={() => window.open(show.ticketUrl, '_blank')}
                    >
                      Buy Tickets
                    </Button>
                  )}
                  <Link href={`/show/${show.id}`}>
                    <Button variant="outline" className="w-full">
                      Show Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredShows.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Shows Found</h3>
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery || selectedGenre !== "All" || dateFilter
                ? "Try adjusting your search criteria or filters."
                : "Check back later for new shows."
              }
            </p>
            {(searchQuery || selectedGenre !== "All" || dateFilter) && (
              <Button onClick={clearFilters} className="bg-teal-600 hover:bg-teal-700">
                View All Shows
              </Button>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to perform at Swan Dive PDX?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Submit your booking request and join our lineup of amazing artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                Submit Booking Request
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

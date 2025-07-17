"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Archive data - in a real app, this would come from a database
  const archiveData = {
    stats: {
      totalShows: 247,
      totalArtists: 312,
      yearsActive: 8,
      soldOutShows: 89
    },
    events: [
      {
        id: 1,
        date: "2024-06-15",
        title: "Summer Jazz Festival",
        artist: "Portland Jazz Collective",
        genre: "Jazz",
        attendance: 485,
        soldOut: true,
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop",
        description: "An unforgettable night of smooth jazz featuring local and touring musicians.",
        setlist: ["Blue Moon", "Take Five", "Autumn Leaves", "Fly Me to the Moon"],
        revenue: "$15,400"
      },
      {
        id: 2,
        date: "2024-05-22",
        title: "Electronic Dreams",
        artist: "Neon Synthesis",
        genre: "Electronic",
        attendance: 462,
        soldOut: true,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        description: "Pulsating beats and ethereal melodies filled the venue.",
        setlist: ["Digital Sunrise", "Neon Nights", "Binary Dreams", "Quantum Loop"],
        revenue: "$18,500"
      },
      {
        id: 3,
        date: "2024-04-18",
        title: "Rock Revival Night",
        artist: "The Portland Rockers",
        genre: "Rock",
        attendance: 398,
        soldOut: false,
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
        description: "High-energy rock performance that brought the house down.",
        setlist: ["Thunder Road", "Electric Soul", "City Lights", "Rock & Roll Heart"],
        revenue: "$12,750"
      },
      {
        id: 4,
        date: "2024-03-12",
        title: "Indie Showcase",
        artist: "Various Artists",
        genre: "Indie",
        attendance: 324,
        soldOut: false,
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=400&fit=crop",
        description: "A celebration of local indie talent with multiple acts.",
        setlist: ["Opening Acts", "Featured Performers", "Headliner Set", "Encore"],
        revenue: "$9,720"
      },
      {
        id: 5,
        date: "2024-02-14",
        title: "Valentine's Acoustic",
        artist: "Sarah & The Moonlight",
        genre: "Folk",
        attendance: 287,
        soldOut: false,
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
        description: "Intimate acoustic performance perfect for Valentine's Day.",
        setlist: ["Love Song", "Moonlight Serenade", "Whispered Dreams", "Forever Yours"],
        revenue: "$8,610"
      },
      {
        id: 6,
        date: "2024-01-20",
        title: "Hip-Hop Underground",
        artist: "Portland Cypher",
        genre: "Hip-Hop",
        attendance: 421,
        soldOut: true,
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop",
        description: "Raw, authentic hip-hop from the Portland underground scene.",
        setlist: ["City Streets", "Underground", "Respect the Game", "Portland Pride"],
        revenue: "$14,735"
      }
    ]
  };

  const years = ["2024", "2023", "2022", "2021"];
  const genres = ["All", "Jazz", "Electronic", "Rock", "Indie", "Folk", "Hip-Hop"];

  const filteredEvents = archiveData.events.filter(event => {
    const yearMatch = event.date.startsWith(selectedYear);
    const genreMatch = selectedGenre === "All" || event.genre === selectedGenre;
    return yearMatch && genreMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Events Archive
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Swan Dive PDX's rich musical history. From intimate acoustic sets to sold-out electronic shows,
            discover the moments that have defined our venue.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">{archiveData.stats.totalShows}</div>
              <div className="text-sm text-gray-600">Total Shows</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">{archiveData.stats.totalArtists}</div>
              <div className="text-sm text-gray-600">Artists Hosted</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">{archiveData.stats.yearsActive}</div>
              <div className="text-sm text-gray-600">Years Active</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">{archiveData.stats.soldOutShows}</div>
              <div className="text-sm text-gray-600">Sold Out Shows</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Year:</span>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
                className={selectedYear === year ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {year}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Genre:</span>
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
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {event.genre}
                  </Badge>
                </div>
                {event.soldOut && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive">Sold Out</Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                    <p className="text-lg text-gray-600 font-medium">{event.artist}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(event.date)}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-4">{event.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Attendance:</span>
                    <p className="font-semibold">{event.attendance} people</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Revenue:</span>
                    <p className="font-semibold text-teal-600">{event.revenue}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">Highlights:</span>
                  <div className="flex flex-wrap gap-1">
                    {event.setlist.map((song, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {song}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your filters to see more events.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to be part of our history?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Submit your booking request and create the next memorable night at Swan Dive PDX.
          </p>
          <Button
            onClick={() => window.location.href = "/booking"}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg"
          >
            Submit Booking Request
          </Button>
        </div>
      </div>

    </div>
  );
}

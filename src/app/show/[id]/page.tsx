"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Music, DollarSign } from "lucide-react";
import Link from "next/link";

export default function ShowPage() {
  const { id } = useParams();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shows = getShows();
    const foundShow = shows.find(s => s.id === id);
    setShow(foundShow || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading show details...</p>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Show Not Found</h1>
          <p className="text-gray-600 mb-8">The show you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Shows</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleTicketClick = () => {
    window.open(show.ticketUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link href="/calendar" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
          ← Back to Calendar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Show Image */}
          <div className="lg:col-span-2">
            {show.imageUrl && (
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={show.imageUrl}
                  alt={show.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Show Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2">{show.title}</CardTitle>
                    <p className="text-xl text-gray-600">{show.artist}</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {show.genre}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{show.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-gray-600">{formatDate(show.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-gray-600">{show.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Venue</p>
                      <p className="text-gray-600">{show.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Capacity</p>
                      <p className="text-gray-600">{show.capacity} people</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Ticket Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    ${show.price}
                  </div>
                  <p className="text-gray-600 mb-6">per ticket</p>

                  {show.soldOut ? (
                    <div>
                      <Badge variant="destructive" className="mb-4 text-lg px-4 py-2">
                        SOLD OUT
                      </Badge>
                      <p className="text-gray-500 text-sm">
                        This show is sold out. Check back for last-minute releases.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={handleTicketClick}
                        size="lg"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4"
                      >
                        Buy Tickets
                      </Button>
                      <p className="text-gray-500 text-sm">
                        Tickets available now. Don't miss out!
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Venue Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Swan Dive PDX</strong></p>
                    <p>727 SE Grand Ave</p>
                    <p>Portland, OR 97214</p>
                    <p>(503) 227-7777</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

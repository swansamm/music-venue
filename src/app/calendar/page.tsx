"use client";

import { useState, useEffect } from "react";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CalendarPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setShows(getShows());
  }, []);

  // Get shows for selected date
  const selectedDateShows = shows.filter(show => {
    const showDate = new Date(show.date);
    return (
      showDate.getDate() === selectedDate.getDate() &&
      showDate.getMonth() === selectedDate.getMonth() &&
      showDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Get dates that have shows
  const showDates = shows.map(show => new Date(show.date));



  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Show Calendar</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our upcoming shows by date and find your next live music experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    hasShow: showDates
                  }}
                  modifiersStyles={{
                    hasShow: {
                      backgroundColor: 'rgb(20 184 166)',
                      color: 'white',
                      borderRadius: '6px'
                    }
                  }}
                />
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-500 rounded"></div>
                    <span>Days with shows are highlighted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shows for selected date */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Shows on {formatDate(selectedDate)}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateShows.length === 0 ? (
                  <p className="text-gray-500">No shows scheduled for this date.</p>
                ) : (
                  <div className="space-y-4">
                    {selectedDateShows.map((show) => (
                      <Link key={show.id} href={`/show/${show.id}`}>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{show.title}</h3>
                            <Badge variant="secondary">{show.genre}</Badge>
                          </div>
                          <p className="text-gray-600 mb-1">{show.artist}</p>
                          <p className="text-sm text-gray-500">{show.time} • {show.venue}</p>
                          <p className="text-lg font-bold text-teal-600 mt-2">${show.price}</p>
                          {show.soldOut && (
                            <Badge variant="destructive" className="mt-2">Sold Out</Badge>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

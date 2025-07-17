"use client";

import { useState, useEffect } from "react";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";

export default function CalendarPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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

  // Get shows for current month view
  const currentMonthShows = shows.filter(show => {
    const showDate = new Date(show.date);
    return (
      showDate.getMonth() === currentMonth.getMonth() &&
      showDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  const formatDate = (date: Date) => {
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Show Calendar</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our upcoming shows by date and find your next live music experience. Click on any date to see shows or view details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Large Calendar */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CalendarDays className="w-6 h-6 text-teal-600" />
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </CardTitle>
                <p className="text-gray-600">Click on any date to see shows scheduled for that day</p>
              </CardHeader>
              <CardContent className="p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  onMonthChange={(month) => setCurrentMonth(month)}
                  className="w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4 w-full",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-lg font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-gray-500 rounded-md w-12 h-12 font-normal text-sm flex items-center justify-center",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm relative p-0 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors",
                    day_selected: "bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-700",
                    day_today: "bg-gray-200 text-gray-900",
                    day_outside: "text-gray-400 opacity-50",
                    day_disabled: "text-gray-400 opacity-50",
                    day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
                    day_hidden: "invisible",
                  }}
                  modifiers={{
                    hasShow: showDates
                  }}
                  modifiersStyles={{
                    hasShow: {
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(20, 184, 166, 0.1)',
                      border: '2px solid rgb(20, 184, 166)',
                    }
                  }}
                />
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-600 rounded"></div>
                    <span>Selected date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-teal-500 bg-teal-50 rounded"></div>
                    <span>Days with shows</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shows for selected date */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  {formatDate(selectedDate)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateShows.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarDays className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4">No shows scheduled for this date.</p>
                    <Link href="/shows">
                      <Button variant="outline" size="sm">
                        View All Shows
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDateShows.map((show) => (
                      <div key={show.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{show.title}</h3>
                          <Badge variant="secondary" className="text-xs">{show.genre}</Badge>
                        </div>

                        <p className="text-gray-600 mb-3 text-sm font-medium">{show.artist}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(show.time)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{show.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Ticket className="w-3 h-3" />
                            <span>${show.price.toFixed(2)}</span>
                          </div>
                        </div>

                        {show.soldOut && (
                          <Badge variant="destructive" className="mb-3 text-xs">Sold Out</Badge>
                        )}

                        <div className="space-y-2">
                          <Link href={`/show/${show.id}`}>
                            <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-xs">
                              View Details
                            </Button>
                          </Link>
                          {!show.soldOut && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => window.open(show.ticketUrl, '_blank')}
                            >
                              Buy Tickets
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Month Shows Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            All Shows in {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          {currentMonthShows.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No shows scheduled for this month.</p>
              <Link href="/shows">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  View All Upcoming Shows
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMonthShows
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((show) => (
                  <Card key={show.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={show.imageUrl}
                        alt={show.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                          {show.genre}
                        </Badge>
                      </div>
                      {show.soldOut && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="destructive" className="text-xs">Sold Out</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">{show.title}</h3>
                      <p className="text-gray-600 mb-2 text-sm">{show.artist}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        {formatDate(new Date(show.date))} • {formatTime(show.time)}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-teal-600">${show.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">{show.venue}</span>
                      </div>
                      <Link href={`/show/${show.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

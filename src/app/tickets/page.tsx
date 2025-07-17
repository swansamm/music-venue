"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getShows } from "@/lib/show-store";
import { Show, TicketPurchase } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, Calendar, Clock, MapPin, Download, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function TicketsPage() {
  const { user } = useAuth();
  const [ticketsWithShows, setTicketsWithShows] = useState<(TicketPurchase & { show?: Show })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      redirect("/");
      return;
    }

    const allShows = getShows();
    const enrichedTickets = user.ticketHistory.map(ticket => ({
      ...ticket,
      show: allShows.find(show => show.id === ticket.showId)
    }));

    setTicketsWithShows(enrichedTickets);
    setLoading(false);
  }, [user]);

  if (!user) {
    return null;
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

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
      case 'refunded':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <RefreshCw className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const totalSpent = ticketsWithShows.reduce((total, ticket) =>
    ticket.status === 'confirmed' ? total + ticket.totalPrice : total, 0
  );

  const upcomingTickets = ticketsWithShows.filter(ticket =>
    ticket.show && new Date(ticket.show.date) >= new Date() && ticket.status === 'confirmed'
  );

  const pastTickets = ticketsWithShows.filter(ticket =>
    ticket.show && new Date(ticket.show.date) < new Date()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Ticket className="w-10 h-10 text-teal-600" />
            My Tickets
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            View your ticket purchase history and upcoming shows
          </p>
        </div>

        {ticketsWithShows.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Tickets Yet</h3>
            <p className="text-gray-500 text-lg mb-8">
              Purchase tickets for upcoming shows to see them here.
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{ticketsWithShows.length}</div>
                  <div className="text-sm text-gray-600">Total Tickets</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{upcomingTickets.length}</div>
                  <div className="text-sm text-gray-600">Upcoming Shows</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{pastTickets.length}</div>
                  <div className="text-sm text-gray-600">Shows Attended</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">${totalSpent.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Tickets */}
            {upcomingTickets.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Shows</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingTickets
                    .sort((a, b) => new Date(a.show!.date).getTime() - new Date(b.show!.date).getTime())
                    .map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={ticket.show!.imageUrl}
                          alt={ticket.show!.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 text-gray-800">
                            {ticket.show!.genre}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1 capitalize">{ticket.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{ticket.show!.title}</h3>
                        <p className="text-gray-600 mb-4 font-medium">{ticket.show!.artist}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span>{formatDate(ticket.show!.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span>{formatTime(ticket.show!.time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-teal-600" />
                            <span>{ticket.show!.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-teal-600" />
                            <span>{ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <div>
                            <span className="text-2xl font-bold text-teal-600">${ticket.totalPrice.toFixed(2)}</span>
                            <p className="text-xs text-gray-500">
                              Purchased {new Date(ticket.purchaseDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Link href={`/show/${ticket.show!.id}`}>
                              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                View Show
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Tickets */}
            {pastTickets.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Shows</h2>
                <div className="space-y-4">
                  {pastTickets
                    .sort((a, b) => new Date(b.show!.date).getTime() - new Date(a.show!.date).getTime())
                    .map((ticket) => (
                    <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={ticket.show!.imageUrl}
                              alt={ticket.show!.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="text-lg font-bold">{ticket.show!.title}</h3>
                              <p className="text-gray-600">{ticket.show!.artist}</p>
                              <p className="text-sm text-gray-500">
                                {formatDate(ticket.show!.date)} • {formatTime(ticket.show!.time)} • {ticket.show!.venue}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(ticket.status)}>
                                {getStatusIcon(ticket.status)}
                                <span className="ml-1 capitalize">{ticket.status}</span>
                              </Badge>
                            </div>
                            <p className="text-lg font-bold text-teal-600">${ticket.totalPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Keep the Music Going
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Discover more amazing shows and add to your collection of unforgettable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shows">
                  <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                    Browse Shows
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3">
                    View Favorites
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

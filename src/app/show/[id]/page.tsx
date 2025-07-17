"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getShows } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/social-share";
import { ShowPhotoGallery } from "@/components/show-photo-gallery";
import { ArrowLeft, Calendar, Clock, MapPin, Users, ExternalLink, Share2, Heart } from "lucide-react";



export default function ShowDetailPage() {
  const params = useParams();
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const [show, setShow] = useState<Show | null>(null);
  const [relatedShows, setRelatedShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shows = getShows();
    const currentShow = shows.find(s => s.id === params.id);

    if (currentShow) {
      setShow(currentShow);
      // Get related shows (same genre or venue)
      const related = shows
        .filter(s => s.id !== currentShow.id && (s.genre === currentShow.genre || s.venue === currentShow.venue))
        .slice(0, 3);
      setRelatedShows(related);
    }
    setLoading(false);
  }, [params.id]);

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
          <p className="text-gray-600">Loading show details...</p>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.387 0-4.535.832-6.243 2.209A7.953 7.953 0 015 17c0-.933.162-1.829.459-2.65M8 5a3 3 0 116 0v1H8V5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Show Not Found</h1>
          <p className="text-gray-600 mb-6">
            The show you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/shows">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={show.imageUrl}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/shows">
            <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shows
            </Button>
          </Link>
        </div>

        {/* Show Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-0 text-white">
                {show.genre}
              </Badge>
              {show.soldOut && (
                <Badge variant="destructive" className="bg-red-600/90 backdrop-blur-sm border-0">
                  Sold Out
                </Badge>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{show.title}</h1>
            <p className="text-2xl text-gray-200 font-medium">{show.artist}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p className="text-gray-600">{formatDate(show.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-900">Time</p>
                      <p className="text-gray-600">{formatTime(show.time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-900">Venue</p>
                      <p className="text-gray-600">{show.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-900">Capacity</p>
                      <p className="text-gray-600">{show.capacity} guests</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Show</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">{show.description}</p>
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Swan Dive PDX</h4>
                    <p className="text-gray-600">727 SE Grand Ave, Portland, OR 97214</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Getting There</h4>
                    <p className="text-gray-600">
                      Street parking available on SE Grand Ave and surrounding streets.
                      Public transportation recommended. Bike parking available on-site.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Age Restrictions</h4>
                    <p className="text-gray-600">
                      Most shows are 21+ unless otherwise specified. Valid photo ID required for entry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Purchase */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-teal-600 mb-1">
                      ${show.price.toFixed(2)}
                    </div>
                    <p className="text-gray-600">per ticket</p>
                  </div>

                  <div className="space-y-3">
                    {show.soldOut ? (
                      <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
                        Sold Out
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        onClick={() => window.open(show.ticketUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buy Tickets
                      </Button>
                    )}

                    {user && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          if (user.favorites.includes(show.id)) {
                            removeFromFavorites(show.id);
                          } else {
                            addToFavorites(show.id);
                          }
                        }}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${user.favorites.includes(show.id) ? 'fill-current text-red-500' : ''}`} />
                        {user.favorites.includes(show.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Tickets sold through external provider
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Genre</span>
                  <Badge variant="outline">{show.genre}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doors Open</span>
                  <span className="font-medium">30 min before show</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">~2-3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking</span>
                  <span className="font-medium">Street parking</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-gray-600 mb-3">Need help or have questions about this show?</p>
                  <div className="space-y-2">
                    <a
                      href="tel:(503) 227-7777"
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      (503) 227-7777
                    </a>
                    <Link href="/contact" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Show</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialShare
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={`${show.title} at Swan Dive PDX`}
                  description={`${show.artist} performing ${formatDate(show.date)} at ${show.venue}`}
                  hashtags={['SwanDivePDX', 'LiveMusic', 'Portland', show.genre.replace(/\s+/g, '')]}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Shows */}
        {relatedShows.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedShows.map((relatedShow) => (
                <Card key={relatedShow.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={relatedShow.imageUrl}
                      alt={relatedShow.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {relatedShow.genre}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{relatedShow.title}</h3>
                    <p className="text-gray-600 mb-2">{relatedShow.artist}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      {formatDate(relatedShow.date)} • ${relatedShow.price}
                    </p>
                    <Link href={`/show/${relatedShow.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        <div className="mt-16">
          <ShowPhotoGallery showId={show.id} showTitle={show.title} />
        </div>
      </div>
    </div>
  );
}

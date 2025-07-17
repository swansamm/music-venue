"use client";

import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleTicketClick = () => {
    window.open(show.ticketUrl, "_blank");
  };

  return (
    <Card className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {show.imageUrl && (
        <div className="relative h-56 bg-gray-200 overflow-hidden">
          <img
            src={show.imageUrl}
            alt={show.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Badge
            variant="secondary"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 border-0"
          >
            {show.genre}
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-3 pb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
            {show.title}
          </h3>
          <p className="text-lg text-gray-600 font-medium">{show.artist}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        <p className="text-gray-700 leading-relaxed">{show.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>
            <span className="font-medium">{formatDate(show.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <span className="font-medium">{show.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-teal-600" />
            </div>
            <span className="font-medium">{show.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <span className="font-medium">{show.capacity} cap</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900">${show.price}</span>
            <span className="text-sm text-gray-500">per ticket</span>
          </div>
          <Button
            onClick={handleTicketClick}
            disabled={show.soldOut}
            size="lg"
            className={`px-6 py-3 font-semibold transition-all ${
              show.soldOut
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {show.soldOut ? "Sold Out" : "Buy Tickets"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

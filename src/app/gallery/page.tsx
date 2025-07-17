"use client";

import { Badge } from "@/components/ui/badge";

export default function GalleryPage() {
  // Sample gallery data - in a real app, this would come from a database or CMS
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      title: "Electric Night - The Synth Collective",
      date: "March 2024",
      description: "An electrifying night of synthesized beats",
      category: "Electronic"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
      title: "Jazz Under Stars - Blue Moon Quartet",
      date: "February 2024",
      description: "Smooth jazz evening under the stars",
      category: "Jazz"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
      title: "Rock Revival - Thunder & Lightning",
      date: "January 2024",
      description: "High-energy rock performance",
      category: "Rock"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
      title: "Indie Vibes - The Portland Collective",
      date: "December 2023",
      description: "Local indie artists showcase",
      category: "Indie"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
      title: "Acoustic Sessions - Various Artists",
      date: "November 2023",
      description: "Intimate acoustic performances",
      category: "Acoustic"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
      title: "Hip-Hop Night - Urban Legends",
      date: "October 2023",
      description: "Underground hip-hop showcase",
      category: "Hip-Hop"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&h=600&fit=crop",
      title: "Folk Festival - Mountain Voices",
      date: "September 2023",
      description: "Traditional and modern folk music",
      category: "Folk"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      title: "Electronic Dreams - Future Sound",
      date: "August 2023",
      description: "Cutting-edge electronic music",
      category: "Electronic"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
      title: "Venue Interior - Main Stage",
      date: "Venue Photos",
      description: "Our beautiful main stage setup",
      category: "Venue"
    }
  ];

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Relive the magic of past performances and get a glimpse of the Swan Dive PDX experience
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm border-0 text-white">
                    {image.category}
                  </Badge>
                  <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90 mb-1">{image.description}</p>
                  <p className="text-xs opacity-75">{image.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-slate-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to see your event featured here?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Book your next performance at Swan Dive PDX and become part of our rich musical legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(503) 227-7777"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call (503) 227-7777
            </a>
            <a
              href="/admin"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your Event
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

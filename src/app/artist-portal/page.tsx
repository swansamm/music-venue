"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Music, Send, CheckCircle, Users, Calendar, Star } from "lucide-react";

export default function ArtistPortalPage() {
  const [formData, setFormData] = useState({
    artistName: "",
    contactName: "",
    email: "",
    phone: "",
    genre: "",
    description: "",
    website: "",
    socialMedia: "",
    musicSamples: "",
    preferredDates: "",
    priceRange: "",
    bandSize: "",
    equipment: "",
    experience: "",
    additionalInfo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const genres = ["Electronic", "Jazz", "Rock", "Indie", "Folk", "Hip-Hop", "Blues", "Country", "Alternative", "Other"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic validation
    if (!formData.artistName || !formData.contactName || !formData.email || !formData.musicSamples) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would save to database/API
      const submission = {
        id: `artist-${Date.now()}`,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      console.log("Artist submission:", submission);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in performing at Swan Dive PDX. We've received your booking request and will review it within 5-7 business days.
            </p>
            <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Our booking team will review your submission and music samples</li>
                <li>• We'll check your preferred dates for availability</li>
                <li>• You'll receive a response within 5-7 business days</li>
                <li>• If selected, we'll discuss contract details, logistics, and promotion</li>
                <li>• We'll schedule a follow-up call to finalize your performance</li>
              </ul>
            </div>
            <div className="mt-8 space-y-4">
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-teal-600 hover:bg-teal-700 mr-4"
              >
                Return to Homepage
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    artistName: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    genre: "",
                    description: "",
                    website: "",
                    socialMedia: "",
                    musicSamples: "",
                    preferredDates: "",
                    priceRange: "",
                    bandSize: "",
                    equipment: "",
                    experience: "",
                    additionalInfo: ""
                  });
                }}
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Music className="w-10 h-10 text-teal-600" />
            Artist Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take the stage at Swan Dive PDX? Submit your booking request and join our lineup of amazing artists.
          </p>
        </div>

        {/* Venue Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">500 Capacity</h3>
              <p className="text-sm text-gray-600">Intimate venue with excellent acoustics and engaged audiences</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Professional Setup</h3>
              <p className="text-sm text-gray-600">Full sound system, lighting, and technical support included</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">Multiple performance opportunities throughout the year</p>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Artist Information */}
          <Card>
            <CardHeader>
              <CardTitle>Artist Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="artistName">Artist/Band Name *</Label>
                  <Input
                    id="artistName"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your stage name or band name"
                  />
                </div>
                <div>
                  <Label htmlFor="genre">Primary Genre *</Label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select a genre</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="bandSize">Band Size</Label>
                  <Input
                    id="bandSize"
                    name="bandSize"
                    value={formData.bandSize}
                    onChange={handleInputChange}
                    placeholder="e.g., Solo artist, 4-piece band"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="How long have you been performing?"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Artist Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your music style, influences, and what makes your performance unique"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name or manager's name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="socialMedia">Social Media Links</Label>
                <Textarea
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Instagram: @youraccount, Facebook: facebook.com/yourpage, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Music & Media */}
          <Card>
            <CardHeader>
              <CardTitle>Music & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="musicSamples">Music Samples/Links *</Label>
                <Textarea
                  id="musicSamples"
                  name="musicSamples"
                  value={formData.musicSamples}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Provide links to your music: Spotify, SoundCloud, YouTube, Bandcamp, or your website. Include your best 3-4 songs."
                />
              </div>

              <div>
                <Label htmlFor="equipment">Equipment & Technical Needs</Label>
                <Textarea
                  id="equipment"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List any special equipment, instruments, or technical requirements you'll bring or need"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferredDates">Preferred Performance Dates</Label>
                  <Input
                    id="preferredDates"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleInputChange}
                    placeholder="e.g., March 15-30, 2025, or any Friday/Saturday"
                  />
                </div>
                <div>
                  <Label htmlFor="priceRange">Fee Range (Optional)</Label>
                  <Input
                    id="priceRange"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    placeholder="e.g., $500-1000, or percentage of door"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about recent performances, notable venues you've played, press coverage, or anything else that would help us understand your act"
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-lg font-semibold"
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? "Submitting Application..." : "Submit Booking Request"}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              * Required fields. We'll respond within 5-7 business days.
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Questions About Performing?</h2>
          <p className="text-gray-300 mb-6">
            Our booking team is here to help. Contact us for more information about performance opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open("mailto:booking@swandivepdx.com", "_blank")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              Email Booking Team
            </Button>
            <Button
              onClick={() => window.open("tel:(503) 227-7777", "_blank")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              Call (503) 227-7777
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

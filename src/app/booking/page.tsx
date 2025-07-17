"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { VENUE_INFO } from "@/lib/types";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    // Artist Information
    artistName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: "",

    // Event Details
    eventTitle: "",
    eventDescription: "",
    genre: "",
    expectedAttendance: "",
    ticketPrice: "",
    preferredDates: "",
    alternativeDates: "",

    // Technical Requirements
    soundEquipment: "",
    lightingNeeds: "",
    stageRequirements: "",
    backlineNeeds: "",

    // Media
    musicSamples: "",
    pressKit: "",
    photos: "",

    // Additional Information
    previousVenues: "",
    tourHistory: "",
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in performing at Swan Dive PDX. We've received your booking request and will review it within 3-5 business days.
            </p>
            <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Our booking team will review your submission</li>
                <li>• We'll check your preferred dates for availability</li>
                <li>• You'll receive a response within 3-5 business days</li>
                <li>• If selected, we'll discuss contract details and logistics</li>
              </ul>
            </div>
            <Button
              onClick={() => window.location.href = "/"}
              className="mt-8 bg-teal-600 hover:bg-teal-700"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Artist Booking Request
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to perform at {VENUE_INFO.name}? Submit your booking request and let's create an unforgettable night of music together.
          </p>
        </div>

        {/* Venue Info */}
        <div className="mb-8 bg-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-teal-400 mb-2">Capacity</h3>
              <p>{VENUE_INFO.capacity} guests</p>
            </div>
            <div>
              <h3 className="font-semibold text-teal-400 mb-2">Location</h3>
              <p>{VENUE_INFO.address}</p>
            </div>
            <div>
              <h3 className="font-semibold text-teal-400 mb-2">Contact</h3>
              <p>{VENUE_INFO.phone}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Artist Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎤</span> Artist Information
              </CardTitle>
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
                  />
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
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
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
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
                <div>
                  <Label htmlFor="socialMedia">Social Media</Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="Instagram, Facebook, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎵</span> Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="eventTitle">Event Title *</Label>
                <Input
                  id="eventTitle"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  required
                  placeholder="Name of your show/tour"
                />
              </div>

              <div>
                <Label htmlFor="eventDescription">Event Description *</Label>
                <Textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your performance, music style, and what makes your show special"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="genre">Genre *</Label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select Genre</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Folk">Folk</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Indie">Indie</option>
                    <option value="Blues">Blues</option>
                    <option value="Country">Country</option>
                    <option value="Alternative">Alternative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="expectedAttendance">Expected Attendance</Label>
                  <Input
                    id="expectedAttendance"
                    name="expectedAttendance"
                    type="number"
                    value={formData.expectedAttendance}
                    onChange={handleInputChange}
                    placeholder="Number of people"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketPrice">Suggested Ticket Price ($)</Label>
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    step="0.01"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferredDates">Preferred Dates *</Label>
                  <Input
                    id="preferredDates"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., March 15-20, 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="alternativeDates">Alternative Dates</Label>
                  <Input
                    id="alternativeDates"
                    name="alternativeDates"
                    value={formData.alternativeDates}
                    onChange={handleInputChange}
                    placeholder="Backup date options"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔧</span> Technical Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="soundEquipment">Sound Equipment Needs</Label>
                  <Textarea
                    id="soundEquipment"
                    name="soundEquipment"
                    value={formData.soundEquipment}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Microphones, monitors, PA system requirements"
                  />
                </div>
                <div>
                  <Label htmlFor="lightingNeeds">Lighting Requirements</Label>
                  <Textarea
                    id="lightingNeeds"
                    name="lightingNeeds"
                    value={formData.lightingNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Special lighting, effects, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="stageRequirements">Stage Setup Requirements</Label>
                  <Textarea
                    id="stageRequirements"
                    name="stageRequirements"
                    value={formData.stageRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Stage layout, special arrangements"
                  />
                </div>
                <div>
                  <Label htmlFor="backlineNeeds">Backline Needs</Label>
                  <Textarea
                    id="backlineNeeds"
                    name="backlineNeeds"
                    value={formData.backlineNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Drums, amps, keyboards, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media & Samples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📱</span> Media & Samples
              </CardTitle>
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
                  rows={3}
                  placeholder="Spotify, SoundCloud, YouTube links, or EPK"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pressKit">Press Kit/EPK</Label>
                  <Input
                    id="pressKit"
                    name="pressKit"
                    type="url"
                    value={formData.pressKit}
                    onChange={handleInputChange}
                    placeholder="Link to press kit or EPK"
                  />
                </div>
                <div>
                  <Label htmlFor="photos">Photos/Media</Label>
                  <Input
                    id="photos"
                    name="photos"
                    type="url"
                    value={formData.photos}
                    onChange={handleInputChange}
                    placeholder="Link to high-res photos"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📝</span> Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="previousVenues">Previous Venues/Experience</Label>
                <Textarea
                  id="previousVenues"
                  name="previousVenues"
                  value={formData.previousVenues}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Notable venues you've performed at"
                />
              </div>

              <div>
                <Label htmlFor="tourHistory">Tour History</Label>
                <Textarea
                  id="tourHistory"
                  name="tourHistory"
                  value={formData.tourHistory}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Recent tours, festivals, achievements"
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Anything else we should know about your performance"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-lg font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              * Required fields. We'll respond within 3-5 business days.
            </p>
          </div>
        </form>
      </div>

    </div>
  );
}

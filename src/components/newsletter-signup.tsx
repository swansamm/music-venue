"use client";

import { useState } from "react";
import { saveNewsletterSubscriber } from "@/lib/newsletter-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, X } from "lucide-react";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
}

export function NewsletterSignup({
  title = "Stay in the Loop",
  description = "Get the latest updates on shows, events, and exclusive offers",
  compact = false,
  className = ""
}: NewsletterSignupProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    preferences: {
      genres: [] as string[],
      frequency: "events-only" as "weekly" | "monthly" | "events-only"
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const genres = ["Electronic", "Jazz", "Rock", "Indie", "Folk", "Hip-Hop", "Blues", "Country"];
  const frequencies = [
    { value: "weekly", label: "Weekly Updates" },
    { value: "monthly", label: "Monthly Digest" },
    { value: "events-only", label: "New Shows Only" }
  ];

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        genres: checked
          ? [...prev.preferences.genres, genre]
          : prev.preferences.genres.filter(g => g !== genre)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.email) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    }

    try {
      await saveNewsletterSubscriber({
        email: formData.email,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        preferences: formData.preferences,
        active: true
      });

      setIsSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          preferences: {
            genres: [],
            frequency: "events-only"
          }
        });
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Swan Dive Family!</h3>
          <p className="text-gray-600">
            You're now subscribed to our newsletter. Get ready for amazing show updates!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className={`bg-teal-600 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-teal-100">{description}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-white"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-800 hover:bg-teal-900 text-white"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </div>
          {error && (
            <p className="text-red-200 text-sm">{error}</p>
          )}
          <p className="text-xs text-teal-100">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-teal-600" />
          {title}
        </CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (Required) */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Optional Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Genre Preferences */}
          <div>
            <Label className="text-base font-medium">Music Genres You Love</Label>
            <p className="text-sm text-gray-500 mb-3">
              Select genres to get personalized show recommendations
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={formData.preferences.genres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                  />
                  <Label
                    htmlFor={`genre-${genre}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Preference */}
          <div>
            <Label className="text-base font-medium">How often would you like to hear from us?</Label>
            <div className="mt-3 space-y-2">
              {frequencies.map((freq) => (
                <div key={freq.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`freq-${freq.value}`}
                    name="frequency"
                    value={freq.value}
                    checked={formData.preferences.frequency === freq.value}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        frequency: e.target.value as "weekly" | "monthly" | "events-only"
                      }
                    })}
                    className="text-teal-600"
                  />
                  <Label
                    htmlFor={`freq-${freq.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {freq.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. You can unsubscribe at any time and we'll never share your information.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

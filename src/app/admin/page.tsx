"use client";

import { useState, useEffect } from "react";
import { getShows, saveShow, deleteShow } from "@/lib/show-store";
import { Show } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus } from "lucide-react";

export default function AdminPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    date: "",
    time: "",
    venue: "Main Stage",
    description: "",
    genre: "",
    price: "",
    ticketUrl: "",
    imageUrl: "",
    capacity: "500",
    soldOut: false,
  });

  useEffect(() => {
    setShows(getShows());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const showData = {
      ...formData,
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity),
    };

    try {
      saveShow(showData);
      setShows(getShows());
      resetForm();
      alert("Show added successfully!");
    } catch (error) {
      alert("Error adding show. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this show?")) {
      deleteShow(id);
      setShows(getShows());
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "",
      date: "",
      time: "",
      venue: "Main Stage",
      description: "",
      genre: "",
      price: "",
      ticketUrl: "",
      imageUrl: "",
      capacity: "500",
      soldOut: false,
    });
    setShowForm(false);
    setEditingShow(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a cloud service
      // For demo purposes, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage shows and events for Swan Dive PDX</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Show
          </Button>
        </div>

        {/* Add Show Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Show</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Show Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="artist">Artist/Band *</Label>
                    <Input
                      id="artist"
                      name="artist"
                      value={formData.artist}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <select
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="Main Stage">Main Stage</option>
                      <option value="Outdoor Pavilion">Outdoor Pavilion</option>
                      <option value="Intimate Room">Intimate Room</option>
                      <option value="Rooftop Terrace">Rooftop Terrace</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="genre">Genre *</Label>
                    <Input
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      placeholder="e.g., Rock, Jazz, Electronic"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Ticket Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="capacity">Venue Capacity *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="ticketUrl">Ticket Purchase URL *</Label>
                    <Input
                      id="ticketUrl"
                      name="ticketUrl"
                      type="url"
                      value={formData.ticketUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/tickets"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="imageUpload">Show Image</Label>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mb-2"
                    />
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Or paste image URL"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="soldOut"
                        checked={formData.soldOut}
                        onChange={handleInputChange}
                        className="rounded"
                      />
                      <span>Mark as Sold Out</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Add Show
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Shows List */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Shows ({shows.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {shows.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No shows found. Add your first show!</p>
            ) : (
              <div className="space-y-4">
                {shows
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((show) => (
                    <div key={show.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{show.title}</h3>
                            <Badge variant="secondary">{show.genre}</Badge>
                            {show.soldOut && (
                              <Badge variant="destructive">Sold Out</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-1">{show.artist}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(show.date)} • {show.time} • {show.venue} • ${show.price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(show.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

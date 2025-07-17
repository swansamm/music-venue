"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { ShowPhoto } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Heart, MessageCircle, User, X, Check } from "lucide-react";

interface ShowPhotoGalleryProps {
  showId: string;
  showTitle: string;
}

// Sample photos data - in a real app, this would come from a database
const samplePhotos: ShowPhoto[] = [
  {
    id: "photo-1",
    showId: "1",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    caption: "Amazing energy from the crowd tonight!",
    uploadedBy: "venue",
    uploadedAt: "2025-01-15T22:30:00Z",
    approved: true
  },
  {
    id: "photo-2",
    showId: "1",
    url: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop",
    caption: "The stage setup was incredible",
    uploadedBy: "demo-user-1",
    uploadedAt: "2025-01-15T23:15:00Z",
    approved: true
  },
  {
    id: "photo-3",
    showId: "1",
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    caption: "Best show ever! The sound was perfect.",
    uploadedBy: "demo-user-1",
    uploadedAt: "2025-01-15T23:45:00Z",
    approved: true
  }
];

export function ShowPhotoGallery({ showId, showTitle }: ShowPhotoGalleryProps) {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<ShowPhoto[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ShowPhoto | null>(null);
  const [uploadData, setUploadData] = useState({
    caption: "",
    photoFile: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Filter photos for this show
    const showPhotos = samplePhotos.filter(photo => photo.showId === showId && photo.approved);
    setPhotos(showPhotos);
  }, [showId]);

  const handlePhotoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !uploadData.photoFile) return;

    setIsUploading(true);
    try {
      // In a real app, this would upload to a server
      const newPhoto: ShowPhoto = {
        id: `photo-${Date.now()}`,
        showId,
        url: URL.createObjectURL(uploadData.photoFile), // Temporary for demo
        caption: uploadData.caption,
        uploadedBy: user.id,
        uploadedAt: new Date().toISOString(),
        approved: false // Photos need approval
      };

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPhotos(prev => [newPhoto, ...prev]);
      setUploadData({ caption: "", photoFile: null });
      setShowUpload(false);

      // Show success message
      alert("Photo submitted! It will appear after moderation approval.");
    } catch (error) {
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-teal-600" />
            Show Photos
          </h3>
          <p className="text-gray-600">Fan photos from {showTitle}</p>
        </div>

        {user && (
          <Button
            onClick={() => setShowUpload(true)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upload Photo</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePhotoUpload} className="space-y-4">
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadData({
                      ...uploadData,
                      photoFile: e.target.files?.[0] || null
                    })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="caption">Caption (Optional)</Label>
                  <Textarea
                    id="caption"
                    value={uploadData.caption}
                    onChange={(e) => setUploadData({
                      ...uploadData,
                      caption: e.target.value
                    })}
                    placeholder="Share your thoughts about the show..."
                    rows={3}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Photos will be reviewed before appearing in the gallery. Please only upload photos from this show.
                </div>
                <Button
                  type="submit"
                  disabled={isUploading || !uploadData.photoFile}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {isUploading ? "Uploading..." : "Upload Photo"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Photos Yet</h3>
          <p className="text-gray-500 mb-4">
            Be the first to share photos from this show!
          </p>
          {user && (
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Upload First Photo
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.caption || "Show photo"}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {photo.uploadedBy === 'venue' ? 'Official' : 'Fan Photo'}
                  </Badge>
                </div>
              </div>
              {(photo.caption || photo.uploadedBy !== 'venue') && (
                <CardContent className="p-4">
                  {photo.caption && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>
                        {photo.uploadedBy === 'venue' ? 'Swan Dive PDX' : 'Fan'}
                      </span>
                    </div>
                    <span>{formatTimeAgo(photo.uploadedAt)}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full">
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || "Show photo"}
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
            {selectedPhoto.caption && (
              <div className="bg-white rounded-lg p-4 mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900 mb-2">{selectedPhoto.caption}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>
                        {selectedPhoto.uploadedBy === 'venue' ? 'Swan Dive PDX' : 'Fan'}
                      </span>
                      <span>•</span>
                      <span>{formatTimeAgo(selectedPhoto.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Prompt for Non-Users */}
      {!user && photos.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-teal-900 mb-2">
            Want to share your photos?
          </h3>
          <p className="text-teal-700 mb-4">
            Sign up or log in to upload and share your photos from this show.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Sign Up / Log In
          </Button>
        </div>
      )}
    </div>
  );
}

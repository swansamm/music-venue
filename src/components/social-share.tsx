"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Facebook, Twitter, MessageCircle, Link2, Check, Copy } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  compact?: boolean;
  className?: string;
}

export function SocialShare({
  url,
  title,
  description = "",
  hashtags = [],
  compact = false,
  className = ""
}: SocialShareProps) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `${title} ${description ? `- ${description}` : ""}`;
  const hashtagString = hashtags.length > 0 ? ` ${hashtags.map(tag => `#${tag}`).join(' ')}` : '';
  const fullShareText = `${shareText}${hashtagString}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(fullShareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(fullShareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${fullShareText} ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
      } catch (error) {
        // If native sharing fails, show custom share options
        setShowShare(true);
      }
    } else {
      setShowShare(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const openShareUrl = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>

        {showShare && (
          <Card className="absolute top-full right-0 mt-2 z-50 w-64">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-3">Share this show</div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => openShareUrl('facebook')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button
                  onClick={() => openShareUrl('twitter')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button
                  onClick={() => openShareUrl('whatsapp')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <Button
                onClick={() => setShowShare(false)}
                variant="ghost"
                size="sm"
                className="w-full mt-3"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-teal-600" />
        <span className="font-medium">Share this show</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          onClick={() => openShareUrl('facebook')}
          variant="outline"
          className="gap-2 hover:bg-blue-50 hover:border-blue-200"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          Facebook
        </Button>

        <Button
          onClick={() => openShareUrl('twitter')}
          variant="outline"
          className="gap-2 hover:bg-sky-50 hover:border-sky-200"
        >
          <Twitter className="w-4 h-4 text-sky-600" />
          Twitter
        </Button>

        <Button
          onClick={() => openShareUrl('whatsapp')}
          variant="outline"
          className="gap-2 hover:bg-green-50 hover:border-green-200"
        >
          <MessageCircle className="w-4 h-4 text-green-600" />
          WhatsApp
        </Button>

        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="gap-2 hover:bg-gray-50"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      {hashtags.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Suggested hashtags:</div>
          <div className="flex flex-wrap gap-1">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

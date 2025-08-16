'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Smartphone, Tablet, Monitor, Link, Loader2 } from 'lucide-react';
import { parseSpotifyUrl, extractTrackId } from '@/lib/spotify';
import { useState, useEffect } from 'react';

interface WallpaperFormProps {
  spotifyLink: string;
  selectedDevice: string;
  onSpotifyLinkChange: (link: string) => void;
  onDeviceChange: (device: string) => void;
  onGenerate: () => void;
  onTrackDataChange?: (trackData: {
    songName: string;
    artistName: string;
    albumArt?: string;
    duration: string;
  } | null) => void;
  isGenerating?: boolean;
}

export default function WallpaperForm({
  spotifyLink,
  selectedDevice,
  onSpotifyLinkChange,
  onDeviceChange,
  onGenerate,
  onTrackDataChange,
  isGenerating = false
}: WallpaperFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [trackData, setTrackData] = useState<{
    songName: string;
    artistName: string;
    albumArt?: string;
    duration: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Parse Spotify URL when it changes
  useEffect(() => {
    const parseTrack = async () => {
      if (!spotifyLink.trim()) {
        setTrackData(null);
        setError(null);
        onTrackDataChange?.(null);
        return;
      }

      const trackId = extractTrackId(spotifyLink);
      if (!trackId) {
        setError('Please enter a valid Spotify track URL');
        setTrackData(null);
        onTrackDataChange?.(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await parseSpotifyUrl(spotifyLink);
        setTrackData(data);
        onTrackDataChange?.(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse Spotify URL');
        setTrackData(null);
        onTrackDataChange?.(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the parsing
    const timeoutId = setTimeout(parseTrack, 500);
    return () => clearTimeout(timeoutId);
  }, [spotifyLink]); // Removed onTrackDataChange from dependencies
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Create Your Wallpaper</CardTitle>
        <CardDescription>
          Connect your Spotify and choose your device to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
                  {/* Spotify Link Input */}
          <div className="space-y-2">
            <label htmlFor="spotify-link" className="text-sm font-medium">
              Spotify Track Link
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
              )}
              <Input
                id="spotify-link"
                type="url"
                placeholder="https://open.spotify.com/track/..."
                value={spotifyLink}
                onChange={(e) => onSpotifyLinkChange(e.target.value)}
                className={`pl-10 ${isLoading ? 'pr-10' : ''} ${error ? 'border-red-500' : ''}`}
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
            
            {!error && !trackData && (
              <p className="text-xs text-muted-foreground">
                Paste a link to any Spotify track you&apos;d like to create a wallpaper for
              </p>
            )}
          </div>

        {/* Device Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Select Device
          </label>
          <div className="flex flex-wrap gap-2">
            <Badge
              asChild
              variant={selectedDevice === 'mobile' ? 'default' : 'secondary'}
            >
              <button
                type="button"
                className="cursor-pointer transition-colors px-4 py-2 text-sm"
                onClick={() => onDeviceChange('mobile')}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Mobile
              </button>
            </Badge>
            <Badge
              asChild
              variant={selectedDevice === 'tablet' ? 'default' : 'secondary'}
            >
              <button
                type="button"
                className="cursor-pointer transition-colors px-4 py-2 text-sm"
                onClick={() => onDeviceChange('tablet')}
              >
                <Tablet className="w-5 h-5 mr-2" />
                Tablet
              </button>
            </Badge>
            <Badge
              asChild
              variant={selectedDevice === 'pc' ? 'default' : 'secondary'}
            >
              <button
                type="button"
                className="cursor-pointer transition-colors px-4 py-2 text-sm"
                onClick={() => onDeviceChange('pc')}
              >
                <Monitor className="w-5 h-5 mr-2" />
                PC
              </button>
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Choose the device type for optimal wallpaper dimensions
          </p>
        </div>

                  {/* Generate Button */}
          <Button 
            className="w-full" 
            size="lg" 
            onClick={onGenerate}
            disabled={!trackData || isLoading || !!error || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Wallpaper
              </>
            )}
          </Button>
      </CardContent>
    </Card>
  );
}


'use client';

import { useState, useCallback, useRef } from 'react';
import PageHeader from './components/PageHeader';
import WallpaperPreview from './components/WallpaperPreview';
import WallpaperForm from './components/WallpaperForm';
import { toPng } from 'html-to-image';

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<string>('mobile');
  const [spotifyLink, setSpotifyLink] = useState<string>('https://open.spotify.com/track/3T4N6wohtfOJN4okuvHiWT?si=9385d874985f4041');
  const [trackData, setTrackData] = useState<{
    songName: string;
    artistName: string;
    albumArt?: string;
    duration: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!previewRef.current || !trackData) return;

    setIsGenerating(true);
    try {
      // Get original dimensions
      const originalWidth = previewRef.current.offsetWidth;
      const originalHeight = previewRef.current.offsetHeight;
      
      // Calculate 4K scaling factors
      // 4K resolution targets based on device
      const targetResolutions = {
        mobile: { width: 1440, height: 2560 },  // 4K mobile (9:16)
        tablet: { width: 3840, height: 2160 },  // 4K UHD (16:9)
        pc: { width: 3840, height: 2160 }        // 4K UHD (16:9)
      };
      
      const targetRes = targetResolutions[selectedDevice as keyof typeof targetResolutions] || targetResolutions.mobile;
      const scaleX = targetRes.width / originalWidth;
      const scaleY = targetRes.height / originalHeight;
      const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio
      
      
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: scale,
        width: originalWidth * scale,
        height: originalHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }
      });
      
      const link = document.createElement('a');
      link.download = `spotify-wallpaper-4k-${trackData.songName.replace(/[^a-zA-Z0-9]/g, '-')}-${selectedDevice}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating wallpaper:', error);
      alert('Failed to generate wallpaper. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTrackDataChange = useCallback((data: {
    songName: string;
    artistName: string;
    albumArt?: string;
    duration: string;
  } | null) => {
    setTrackData(data);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoadingTrack(loading);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader />

      {/* Main Content */}
      <main role="main" aria-label="Spotify Wallpaper Generator">
        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" aria-label="Wallpaper creation interface">
          {/* Preview Column */}
          <aside className="order-2 lg:order-1" aria-label="Wallpaper preview">
            <WallpaperPreview 
              ref={previewRef}
              selectedDevice={selectedDevice}
              songName={trackData?.songName || "Drop It Like It's Hot!"}
              artistName={trackData?.artistName || "HAARPER"}
              currentTime="0:21"
              totalTime={trackData?.duration || "2:15"}
              albumArtUrl={trackData?.albumArt}
              isLoading={isLoadingTrack}
            />
          </aside>

          {/* Form Column */}
          <section className="order-1 lg:order-2" aria-label="Wallpaper configuration">
            <WallpaperForm
              spotifyLink={spotifyLink}
              selectedDevice={selectedDevice}
              onSpotifyLinkChange={setSpotifyLink}
              onDeviceChange={setSelectedDevice}
              onGenerate={handleGenerate}
              onTrackDataChange={handleTrackDataChange}
              onLoadingChange={handleLoadingChange}
              isGenerating={isGenerating}
            />
          </section>
        </section>
      </main>
    </div>
  );
}


'use client';

import { useState, useCallback, useRef } from 'react';
import PageHeader from './components/PageHeader';
import WallpaperPreview from './components/WallpaperPreview';
import WallpaperForm from './components/WallpaperForm';
import { toPng } from 'html-to-image';

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<string>('mobile');
  const [spotifyLink, setSpotifyLink] = useState<string>('');
  const [trackData, setTrackData] = useState<{
    songName: string;
    artistName: string;
    albumArt?: string;
    duration: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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
      
      console.log(`Generating 4K wallpaper: ${targetRes.width}x${targetRes.height} (scale: ${scale.toFixed(2)}x)`);
      
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Preview Column */}
        <div className="order-2 lg:order-1">
          <WallpaperPreview 
            ref={previewRef}
            selectedDevice={selectedDevice}
            songName={trackData?.songName || "Kickstart My Heart"}
            artistName={trackData?.artistName || "Mötley Crüe"}
            currentTime="0:21"
            totalTime={trackData?.duration || "4:42"}
            albumArtUrl={trackData?.albumArt}
          />
        </div>

        {/* Form Column */}
        <div className="order-1 lg:order-2">
          <WallpaperForm
            spotifyLink={spotifyLink}
            selectedDevice={selectedDevice}
            onSpotifyLinkChange={setSpotifyLink}
            onDeviceChange={setSelectedDevice}
            onGenerate={handleGenerate}
            onTrackDataChange={handleTrackDataChange}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}

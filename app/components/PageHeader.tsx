import { Music } from 'lucide-react';

export default function PageHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Music className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">
        Create Beautiful Spotify Wallpapers
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Transform your favorite Spotify tracks into stunning wallpapers for your devices
      </p>
    </div>
  );
}

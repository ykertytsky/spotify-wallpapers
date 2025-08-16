import { Music } from 'lucide-react';

export default function PageHeader() {
  return (
    <header className="text-center mb-12" role="banner">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center" aria-hidden="true">
          <Music className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">
        Create Beautiful Spotify Wallpapers
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Transform your favorite Spotify tracks into stunning 4K wallpapers for mobile, tablet, and desktop devices
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
        <span className="bg-muted px-3 py-1 rounded-full">🎵 Spotify Integration</span>
        <span className="bg-muted px-3 py-1 rounded-full">📱 Multi-Device Support</span>
        <span className="bg-muted px-3 py-1 rounded-full">🎨 4K Resolution</span>
        <span className="bg-muted px-3 py-1 rounded-full">⚡ Instant Generation</span>
      </div>
    </header>
  );
}

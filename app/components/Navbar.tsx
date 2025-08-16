'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Spotify Wallpapers</span>
            </Link>
          </div>

          {/* Start Button */}
          <div className="flex items-center">
            <Button size="lg" className="rounded-full">
              Start Creating
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

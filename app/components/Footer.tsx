import { Button } from '@/components/ui/button';
import { Coffee, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donation Section */}
          <div className='flex flex-col justify-start'>
            <h3 className="text-lg font-semibold mb-4">Support the Project</h3>
            <p className="text-muted-foreground mb-4">
              If you enjoy using Spotify Wallpapers, consider supporting the development!
            </p>
            <div className="space-y-3 space-x-3">
              <Button variant="outline" className="w-full md:w-auto" size="lg">
                <Coffee className="w-4 h-4 mr-2" />
                Buy me a coffee
              </Button>
              <Button variant="outline" className="w-full md:w-auto" size="lg">
                <Github className="w-4 h-4 mr-2" />
                Support on GitHub
              </Button>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            © 2025 Made with 🤍 by Yarema Kertytsky. <br />All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

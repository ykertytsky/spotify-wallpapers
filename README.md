# Spotify Wallpapers 🎵

Create beautiful, high-resolution wallpapers from your favorite Spotify tracks. Generate 4K wallpapers for mobile, tablet, and desktop devices with a modern, dark-themed music player interface.

## ✨ Features

- 🎨 **4K Resolution**: Generate ultra-high-definition wallpapers (up to 3840x2160)
- 📱 **Multi-Device Support**: Optimized layouts for mobile, tablet, and desktop
- 🎵 **Spotify Integration**: Connect any Spotify track URL to create wallpapers
- 🖼️ **Modern UI**: Dark theme with sleek music player interface
- ⚡ **Instant Generation**: Real-time preview and one-click download
- 🔒 **Privacy First**: No data stored, all processing happens locally

## 🚀 Live Demo

[Deploy your own instance](#deployment) or check out the live demo!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Shadcn/ui
- **Image Generation**: html-to-image
- **Icons**: Lucide React + React Icons
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spotify-wallpapers.git
   cd spotify-wallpapers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Spotify API credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Paste a Spotify Track URL**
   - Copy any track URL from Spotify
   - Paste it into the input field
   - The app will automatically fetch track details

2. **Choose Your Device**
   - Select mobile, tablet, or desktop layout
   - Preview updates in real-time

3. **Generate & Download**
   - Click "Generate Wallpaper"
   - Download your 4K resolution wallpaper

## 🎨 Customization

### Wallpaper Layouts

- **Mobile**: 9:16 aspect ratio, optimized for phone screens
- **Tablet**: 16:9 aspect ratio, perfect for tablets
- **Desktop**: 16:9 aspect ratio, ideal for monitors

### Generated Elements

- Album artwork (fetched from Spotify)
- Song title and artist name
- Progress bar with time indicators
- Playback control buttons
- Dark theme with modern styling

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings
   - Deploy!

### Environment Variables

Set these in your Vercel project:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Configuration

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Copy Client ID and Client Secret
4. Add to environment variables

### Build Configuration

The project includes optimized settings for production:

- **Standalone Output**: Faster deployments
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Security Headers**: XSS protection and content type validation
- **Package Optimization**: Smaller bundle sizes

## 📁 Project Structure

```
spotify-wallpapers/
├── app/
│   ├── api/spotify/track/     # Spotify API integration
│   ├── components/            # React components
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/ui/            # Shadcn/ui components
├── lib/                      # Utility functions
├── public/                   # Static assets
└── vercel.json              # Vercel configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for track data
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [html-to-image](https://github.com/bubkoo/html-to-image) for image generation
- [Vercel](https://vercel.com) for hosting and deployment

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are installed: `npm install`
- Check TypeScript compilation: `npm run build`
- Verify environment variables are set

**Spotify API Issues**
- Confirm API credentials are valid
- Check rate limits and quotas
- Verify track URLs are accessible

**Image Generation Problems**
- Test with different Spotify URLs
- Check browser console for errors
- Ensure CORS is properly configured

### Support

If you encounter issues:
1. Check the [deployment guide](DEPLOYMENT.md)
2. Review environment variable configuration
3. Test locally with `npm run build`
4. Open an issue on GitHub

---

Made with ❤️ by [Your Name]

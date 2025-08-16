// Spotify Web API utilities
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

export interface ParsedTrackData {
  songName: string;
  artistName: string;
  albumArt: string;
  duration: string;
  spotifyUrl: string;
}

/**
 * Extract track ID from Spotify URL
 */
export function extractTrackId(url: string): string | null {
  try {
    // Handle different Spotify URL formats
    const patterns = [
      /spotify:track:([a-zA-Z0-9]+)/,
      /spotify\.com\/track\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting track ID:', error);
    return null;
  }
}

/**
 * Format duration from milliseconds to MM:SS
 */
export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get the best quality album art URL
 */
export function getBestAlbumArt(images: SpotifyTrack['album']['images']): string {
  if (!images || images.length === 0) return '';
  
  // Sort by size (largest first) and return the URL
  const sortedImages = images.sort((a, b) => (b.height || 0) - (a.height || 0));
  return sortedImages[0]?.url || '';
}

/**
 * Parse Spotify track data into our format
 */
export function parseSpotifyTrack(track: SpotifyTrack): ParsedTrackData {
  return {
    songName: track.name,
    artistName: track.artists.map(artist => artist.name).join(', '),
    albumArt: getBestAlbumArt(track.album.images),
    duration: formatDuration(track.duration_ms),
    spotifyUrl: track.external_urls.spotify
  };
}

/**
 * Fetch track data from Spotify Web API
 * Note: This requires a Spotify Web API access token
 */
export async function fetchSpotifyTrack(trackId: string, accessToken: string): Promise<SpotifyTrack | null> {
  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
    return null;
  }
}

/**
 * Get Spotify Web API access token using Client Credentials flow
 * This is for public track data only (no user data)
 */
export async function getSpotifyAccessToken(clientId: string, clientSecret: string): Promise<string | null> {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

/**
 * Main function to parse Spotify URL and get track data
 */
export async function parseSpotifyUrl(url: string): Promise<ParsedTrackData | null> {
  const trackId = extractTrackId(url);
  if (!trackId) {
    throw new Error('Invalid Spotify URL. Please provide a valid Spotify track URL.');
  }

  try {
    // Call our Next.js API route to fetch track data
    const response = await fetch(`/api/spotify/track?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch track data');
    }

    return result.data;
  } catch (error) {
    // If it's a network error or API is not available, provide helpful error message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to Spotify API. Please check your internet connection.');
    }
    
    // Re-throw the error as-is if it's already a proper error message
    throw error;
  }
}

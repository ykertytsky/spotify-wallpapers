import { NextRequest, NextResponse } from 'next/server';
import { extractTrackId, parseSpotifyTrack, type SpotifyTrack } from '@/lib/spotify';

// Get Spotify access token using Client Credentials flow
async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured. Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your environment variables.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to get Spotify access token: ${response.status} ${errorData}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch track data from Spotify Web API
async function fetchSpotifyTrack(trackId: string): Promise<SpotifyTrack> {
  const accessToken = await getSpotifyAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Track not found. Please check the Spotify URL.');
    }
    const errorData = await response.text();
    throw new Error(`Spotify API error: ${response.status} ${errorData}`);
  }

  return await response.json();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }

    // Extract track ID from URL
    const trackId = extractTrackId(url);
    if (!trackId) {
      return NextResponse.json(
        { error: 'Invalid Spotify URL. Please provide a valid Spotify track URL.' },
        { status: 400 }
      );
    }

    // Fetch track data from Spotify
    const track = await fetchSpotifyTrack(trackId);
    
    // Parse and return track data
    const parsedTrack = parseSpotifyTrack(track);
    
    return NextResponse.json({
      success: true,
      data: parsedTrack
    });

  } catch (error) {
    console.error('Spotify API error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch track data',
        success: false 
      },
      { status: 500 }
    );
  }
}

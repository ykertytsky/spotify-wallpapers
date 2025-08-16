'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Sparkles } from 'lucide-react';
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { forwardRef } from 'react';

interface WallpaperPreviewProps {
  selectedDevice: string;
  songName?: string;
  artistName?: string;
  currentTime?: string;
  totalTime?: string;
  albumArtUrl?: string;
}

const WallpaperPreview = forwardRef<HTMLDivElement, WallpaperPreviewProps>(({ 
  selectedDevice,
  songName = "Kickstart My Heart",
  artistName = "Mötley Crüe",
  currentTime = "0:21",
  totalTime = "4:42",
  albumArtUrl
}, ref) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Preview
        </CardTitle>
        <CardDescription>
          See how your wallpaper will look on your selected device
        </CardDescription>
      </CardHeader>
                  <CardContent>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Device Frame */}
                  <AspectRatio 
                    ratio={
                      selectedDevice === 'mobile' ? 9/16 : 
                      selectedDevice === 'tablet' ? 16/9 : 
                      16/9
                    }
                    className="w-full"
                    ref={ref}
                  >
                    <div className="
                      bg-black rounded-lg shadow-lg border-2 border-border
                      w-full h-full flex items-center justify-center
                    ">
                      {/* Music Player Interface */}
                      <div 
                        className="w-full text-white flex flex-col items-center justify-center h-full"
                        style={{
                          maxWidth: selectedDevice === 'mobile' ? '240px' : '300px',
                          padding: selectedDevice === 'mobile' ? '16px' : '12px'
                        }}
                      >
                        {/* Album Art */}
                        <div style={{ marginBottom: selectedDevice === 'mobile' ? '20px' : '12px' }}>
                          {albumArtUrl ? (
                            <img 
                              src={albumArtUrl} 
                              alt={`${songName} album art`}
                              style={{
                                width: selectedDevice === 'mobile' ? '180px' : '80px',
                                height: selectedDevice === 'mobile' ? '180px' : '80px',
                                borderRadius: '6px',
                                objectFit: 'cover',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                          ) : (
                            <div style={{
                              width: selectedDevice === 'mobile' ? '180px' : '80px',
                              height: selectedDevice === 'mobile' ? '180px' : '80px',
                              borderRadius: '6px',
                              background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}>
                              <div style={{ textAlign: 'center', color: 'white' }}>
                                <div style={{ 
                                  fontWeight: 'bold', 
                                  fontSize: selectedDevice === 'mobile' ? '10px' : '8px',
                                  marginBottom: '2px'
                                }}>MÖTLEY CRÜE</div>
                                <div style={{ 
                                  fontSize: selectedDevice === 'mobile' ? '10px' : '8px'
                                }}>KICKSTART MY HEART</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Song Information */}
                        <div style={{ 
                          marginBottom: selectedDevice === 'mobile' ? '20px' : '12px',
                          textAlign: 'center',
                          width: '100%'
                        }}>
                          <h3 style={{
                            fontWeight: 'bold',
                            marginBottom: selectedDevice === 'mobile' ? '4px' : '2px',
                            fontSize: selectedDevice === 'mobile' ? '18px' : '14px',
                            lineHeight: '1.2'
                          }}>{songName}</h3>
                          <p style={{
                            color: '#6b7280',
                            opacity: 0.9,
                            fontSize: selectedDevice === 'mobile' ? '12px' : '10px',
                            margin: 0
                          }}>{artistName}</p>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ 
                          marginBottom: selectedDevice === 'mobile' ? '20px' : '12px',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            height: '2px',
                            backgroundColor: '#374151',
                            borderRadius: '1px',
                            marginBottom: '4px',
                            width: selectedDevice === 'mobile' ? '180px' : '80px',
                            position: 'relative'
                          }}>
                            <div style={{
                              height: '2px',
                              backgroundColor: 'white',
                              borderRadius: '1px',
                              width: '15%',
                              position: 'relative'
                            }}>
                              <div style={{
                                position: 'absolute',
                                right: '-3px',
                                top: '-2px',
                                width: '6px',
                                height: '6px',
                                backgroundColor: 'white',
                                borderRadius: '50%'
                              }}></div>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#6b7280',
                            fontSize: selectedDevice === 'mobile' ? '10px' : '8px',
                            width: selectedDevice === 'mobile' ? '180px' : '80px'
                          }}>
                            <span>{currentTime}</span>
                            <span>-{totalTime}</span>
                          </div>
                        </div>

                        {/* Playback Controls */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: selectedDevice === 'mobile' ? '16px' : '12px'
                        }}>
                          <button style={{
                            padding: '2px',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer'
                          }}>
                            <IoIosSkipBackward style={{
                              width: selectedDevice === 'mobile' ? '20px' : '16px',
                              height: selectedDevice === 'mobile' ? '20px' : '16px',
                              color: 'white'
                            }} />
                          </button>
                          <button style={{
                            padding: '2px',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer'
                          }}>
                            <div style={{
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: selectedDevice === 'mobile' ? '40px' : '28px',
                              height: selectedDevice === 'mobile' ? '40px' : '28px'
                            }}>
                              <div style={{
                                width: 0,
                                height: 0,
                                borderLeft: selectedDevice === 'mobile' ? '10px solid black' : '6px solid black',
                                borderTop: selectedDevice === 'mobile' ? '6px solid transparent' : '4px solid transparent',
                                borderBottom: selectedDevice === 'mobile' ? '6px solid transparent' : '4px solid transparent',
                                marginLeft: selectedDevice === 'mobile' ? '2px' : '1px'
                              }}></div>
                            </div>
                          </button>
                          <button style={{
                            padding: '2px',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer'
                          }}>
                            <IoIosSkipForward style={{
                              width: selectedDevice === 'mobile' ? '20px' : '16px',
                              height: selectedDevice === 'mobile' ? '20px' : '16px',
                              color: 'white'
                            }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </AspectRatio>
                  
                  {/* Device Label */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedDevice} preview
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    );
  });

  WallpaperPreview.displayName = 'WallpaperPreview';

  export default WallpaperPreview;

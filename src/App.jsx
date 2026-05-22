import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import CinematicVideo from './components/CinematicVideo';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 90; // number of frames to extract

/**
 * Extract frames from a video element by seeking through it.
 * Returns an array of ImageBitmap objects.
 */
async function extractFrames(videoSrc, frameCount, onProgress) {
  // Fetch video as a Blob first to bypass network range request bottlenecks
  const response = await fetch(videoSrc);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let loaded = false;

    video.addEventListener('error', () => {
      URL.revokeObjectURL(objectUrl);
      if (!loaded) reject(new Error('Video load failed'));
    });

    video.addEventListener('canplaythrough', async () => {
      if (loaded) return;
      loaded = true;

      const duration = video.duration;
      console.log(`Sequential capture starting: duration = ${duration}s, dimensions = ${video.videoWidth}x${video.videoHeight}`);

      const canvas = document.createElement('canvas');
      
      // Limit resolution to 1024px width for performance
      const MAX_WIDTH = 1024;
      let w = video.videoWidth;
      let h = video.videoHeight;
      if (w > MAX_WIDTH) {
        const scale = MAX_WIDTH / w;
        w = MAX_WIDTH;
        h = Math.round(h * scale);
      }
      
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const capturedFrames = [];
      let isFinished = false;
      
      // Set high playback rate to complete capture rapidly in memory
      video.playbackRate = 2.5;
      
      // Global safety timeout of 8 seconds to prevent hanging under any circumstance
      const safetyTimeout = setTimeout(() => {
        console.warn('Frame extraction safety timeout hit. Forcing site ready.');
        finishCapture();
      }, 8000);

      const finishCapture = () => {
        if (isFinished) return;
        isFinished = true;
        
        clearTimeout(safetyTimeout);
        video.pause();

        // Downsample the collected frames array to the exact frameCount requested
        const finalFrames = [];
        if (capturedFrames.length > 0) {
          for (let i = 0; i < frameCount; i++) {
            const idx = Math.min(
              Math.floor((i / (frameCount - 1)) * (capturedFrames.length - 1)),
              capturedFrames.length - 1
            );
            finalFrames.push(capturedFrames[idx]);
          }
        } else {
          console.error('Captured frames is empty. Frame extraction failed.');
        }

        console.log(`Sequential capture complete: captured = ${capturedFrames.length}, final = ${finalFrames.length}`);
        
        URL.revokeObjectURL(objectUrl);
        resolve({
          frames: finalFrames,
          width: video.videoWidth,
          height: video.videoHeight,
        });
      };

      // Safe triggers: video ended or paused near the end
      video.addEventListener('ended', () => {
        console.log('Video ended event fired.');
        finishCapture();
      });

      video.addEventListener('pause', () => {
        if (video.currentTime >= duration - 0.5) {
          console.log(`Video paused near the end (${video.currentTime}s). Completing capture.`);
          finishCapture();
        }
      });

      video.play().catch((err) => {
        console.error('Play failed during extraction:', err);
        // If autoplay / play blocks, still try to proceed or finish
        finishCapture();
      });

      const captureFrame = async () => {
        if (isFinished) return;

        // If the video has ended or reached near duration limits, stop
        if (video.ended || video.currentTime >= duration - 0.05) {
          finishCapture();
          return;
        }

        // Draw current frame and convert to ImageBitmap
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const bitmap = await createImageBitmap(canvas);
          capturedFrames.push(bitmap);
        } catch (err) {
          console.error('Failed to create ImageBitmap from frame:', err);
        }

        // Send progress updates (up to 99% during active recording)
        if (onProgress) {
          onProgress(Math.min((video.currentTime / duration) * 100, 99));
        }

        // Request next frame in sync with screen refresh / video frame delivery
        if ('requestVideoFrameCallback' in video) {
          video.requestVideoFrameCallback(captureFrame);
        } else {
          setTimeout(captureFrame, 16);
        }
      };

      // Register initial callback to start capturing frames
      if ('requestVideoFrameCallback' in video) {
        video.requestVideoFrameCallback(captureFrame);
      } else {
        setTimeout(captureFrame, 16);
      }
    });

    video.src = objectUrl;
  });
}

export default function App() {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'ready'
  const [progress, setProgress] = useState(0);
  const [frameData, setFrameData] = useState(null);

  // Extract frames during loading
  useEffect(() => {
    let cancelled = false;

    extractFrames('/assets/developer-video.mp4', FRAME_COUNT, (p) => {
      if (!cancelled) setProgress(p);
    })
      .then((data) => {
        if (!cancelled) {
          setFrameData(data);
          // Small delay for the loader exit animation
          setTimeout(() => setPhase('ready'), 400);
        }
      })
      .catch((err) => {
        console.error('Frame extraction failed:', err);
        // Fallback: still show the site
        if (!cancelled) setPhase('ready');
      });

    return () => { cancelled = true; };
  }, []);

  // Lenis smooth scrolling — only after ready
  useEffect(() => {
    if (phase !== 'ready') return;

    // Reset scroll to top to ensure the intro animations are fully visible
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, [phase]);

  return (
    <>
      {phase === 'loading' && <Loader progress={progress} />}
      {phase === 'ready' && frameData && (
        <CinematicVideo
          frames={frameData.frames}
          videoWidth={frameData.width}
          videoHeight={frameData.height}
        />
      )}
    </>
  );
}

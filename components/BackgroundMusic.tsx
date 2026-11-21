
"use client";

import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    audio.volume = 0.12;

    try {
      await audio.play();
    } catch (error) {
      console.error("Background music playback failed:", error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/Tycho%20-%20Awake.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-[45]">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={
            isPlaying
              ? "Turn background music off"
              : "Turn background music on"
          }
          aria-pressed={isPlaying}
          className={`
            group inline-flex min-h-11 items-center justify-center
            gap-2.5 rounded-full border px-4 py-3
            bg-ink/80 backdrop-blur-xl
            font-mono text-[10px] font-normal uppercase
            tracking-[0.18em]
            transition-colors duration-500
            focus-visible:outline-none
            ${
              isPlaying
                ? "border-accent/40 text-accent"
                : "border-white/10 text-slate-400 hover:border-accent/50 hover:text-accent"
            }
          `}
        >
          {isPlaying ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M3 8v4h3l4 3V5L6 8H3Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="M13 7.5a4 4 0 0 1 0 5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M15 5.5a7 7 0 0 1 0 9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M3 8v4h3l4 3V5L6 8H3Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="m14 8 4 4m0-4-4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          )}

          <span>{isPlaying ? "Sound On" : "Sound Off"}</span>
        </button>
      </div>
    </>
  );
}

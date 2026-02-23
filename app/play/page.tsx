"use client";

import { useEffect, useRef } from "react";

export default function PlayPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let player: any;
    let ui: any;

    const loadPlayer = async () => {
      if (!videoRef.current || !containerRef.current) return;

      const shaka = await import("shaka-player/dist/shaka-player.ui.js");

      shaka.polyfill.installAll();

      if (!shaka.Player.isBrowserSupported()) {
        console.error("Browser not supported");
        return;
      }

      const video = videoRef.current;
      player = new shaka.Player(video);

      await player.attach(video);

      ui = new shaka.ui.Overlay(player, containerRef.current, video);

      ui.configure({
        controlPanelElements: [
          "play_pause",
          "time_and_duration",
          "mute",
          "volume",
          "spacer",
          "language",
          "captions",
          "picture_in_picture",
          "quality",
          "fullscreen",
        ],
      });

      /* ==========================
         DRM CONFIG
      ========================== */

      const drmConfig = {
        clearKeys: {
          "YOUR_KEY_ID": "YOUR_KEY_VALUE",
        },
      };

      player.configure({
        drm: drmConfig,
        streaming: {
          lowLatencyMode: true,
          bufferingGoal: 15,
          rebufferingGoal: 2,
          bufferBehind: 15,
        },
      });

      /* ==========================
         REQUEST FILTER
      ========================== */

      player.getNetworkingEngine().registerRequestFilter(
        (type: any, request: any) => {
          request.headers["Referer"] = "https://www.jiotv.com/";
          request.headers["User-Agent"] =
            "plaYtv/7.1.5 (Linux;Android 13) ExoPlayerLib/2.11.6";

          if (
            (type === shaka.net.NetworkingEngine.RequestType.MANIFEST ||
              type === shaka.net.NetworkingEngine.RequestType.SEGMENT) &&
            request.uris[0]
          ) {
            console.log("Requesting:", request.uris[0]);
          }
        }
      );

      /* ==========================
         LOAD STREAM
      ========================== */

      try {
        await player.load("YOUR_STREAM_URL.mpd");
        console.log("Stream loaded");
      } catch (error) {
        console.error("Load error:", error);
      }
    };

    loadPlayer();

    return () => {
      if (player) player.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-shaka-player
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

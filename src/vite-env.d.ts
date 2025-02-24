/// <reference types="vite/client" />

interface Window {
  YT: {
    Player: any;
    get: (id: string) => any;
  };
  onYouTubeIframeAPIReady: () => void;
}
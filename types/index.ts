export interface MediaItem {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  downloadUrl: string;
  quality: string;
  resolution: string;
  size: string;
  format: string;
}

export interface DownloadResult {
  url: string;
  caption?: string;
  author?: string;
  timestamp?: string;
  media: MediaItem[];
}

export interface DownloadHistory {
  id: string;
  url: string;
  timestamp: number;
  type: "image" | "video" | "mixed";
  thumbnail?: string;
  author?: string;
  itemCount: number;
}

export interface WindowWithHistory extends Window {
  addToDownloadHistory?: (
    item: Omit<DownloadHistory, "id" | "timestamp">
  ) => void;
}

declare global {
  interface Window {
    addToDownloadHistory?: (
      item: Omit<DownloadHistory, "id" | "timestamp">
    ) => void;
  }
}

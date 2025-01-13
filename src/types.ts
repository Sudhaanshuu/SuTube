export interface UserCredentials {
  email: string;
  password: string;
}

export interface VideoDownloadOptions {
  url: string;
  format: 'audio' | 'video';
  quality: string;
}
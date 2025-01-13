import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { VideoDownloadOptions } from '../types';
import toast from 'react-hot-toast';

export function VideoDownloader() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<VideoDownloadOptions>({
    url: '',
    format: 'video',
    quality: 'high',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Download started!');
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl p-8 rounded-lg bg-gray-900 border border-purple-500/30">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
        Video Downloader
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="url"
            placeholder="Paste video URL here"
            className="w-full p-4 rounded-lg bg-gray-800 border border-purple-500/30 text-white focus:border-orange-500 transition-colors"
            value={options.url}
            onChange={(e) => setOptions({ ...options, url: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Format</label>
            <select
              className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white focus:border-orange-500 transition-colors"
              value={options.format}
              onChange={(e) => setOptions({ ...options, format: e.target.value as 'audio' | 'video' })}
            >
              <option value="video">Video</option>
              <option value="audio">Audio Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Quality</label>
            <select
              className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white focus:border-orange-500 transition-colors"
              value={options.quality}
              onChange={(e) => setOptions({ ...options, quality: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !options.url}
          className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold hover:from-purple-700 hover:to-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <><Download className="w-5 h-5" /> Download</>
          )}
        </button>
      </form>
    </div>
  );
}
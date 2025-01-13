import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { VideoDownloader } from './components/VideoDownloader';
import { Toaster } from 'react-hot-toast';
import { LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />
      
      <div className="container mx-auto px-4 py-8">
        {user && (
          <div className="flex justify-end mb-8">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
              Quantum Video Downloader
            </h1>
            <p className="text-gray-400">
              Download your favorite videos with our advanced downloader
            </p>
          </div>

          {user ? (
            <VideoDownloader />
          ) : (
            <AuthForm onSuccess={() => {}} />
          )}
        </div>
      </div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid rgba(147, 51, 234, 0.3)',
          },
        }}
      />
    </div>
  );
}

export default App;
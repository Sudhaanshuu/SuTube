import React, { useState } from 'react';
import { UserCredentials } from '../types';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword(credentials)
        : await supabase.auth.signUp(credentials);

      if (error) throw error;
      
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg bg-gray-900 border border-purple-500/30">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white focus:border-orange-500 transition-colors"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white focus:border-orange-500 transition-colors"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold hover:from-purple-700 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isLogin ? (
            <><LogIn className="w-5 h-5" /> Login</>
          ) : (
            <><UserPlus className="w-5 h-5" /> Sign Up</>
          )}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-orange-500 hover:text-orange-400"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}
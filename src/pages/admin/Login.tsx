import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard/menu');
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-medium text-charcoal">
            Nikhil's Kitchen
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-amber mt-2">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-sand border-2 border-charcoal rounded-xl shadow-hard p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-charcoal/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream border-2 border-charcoal rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-amber transition-colors"
              placeholder="admin@nikhilskitchen.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold uppercase tracking-widest text-charcoal/60">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream border-2 border-charcoal rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-amber transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-artisanal w-full rounded-lg px-6 py-3 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

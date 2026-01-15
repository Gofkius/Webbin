import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, HashRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import About from './pages/About';
import '../index.css';
import { createClient } from '@supabase/supabase-js';
import Register from './auth/Register';
import Design from './pages/Design';
import Manual from './manual/Manual';

export const supabase = createClient(
  'https://uxfupnubotknwkcthuep.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZnVwbnVib3RrbndrY3RodWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTU1MjEsImV4cCI6MjA3NjEzMTUyMX0.g_epxbwk6HMJVdq4uZaIAYIqNLCxmmJDqE9hbtKGoNc',
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
)

export const SessionContext = createContext<{ session: any | null; setSession: (s: any) => void } | null>(null);

const App = () => {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub: any;
    (async () => {
      const { data: { session: current } } = await supabase.auth.getSession();
      setSession(current ?? null);
      setLoading(false);

      const res = supabase.auth.onAuthStateChange((_event, s) => setSession(s ?? null));
      sub = res.data.subscription;
    })();

    return () => sub?.unsubscribe?.();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        backgroundColor: 'var(--color-bg-primary)'
      }}>
        <div style={{ 
          fontSize: '1rem', 
          color: 'var(--color-text-secondary)',
          fontWeight: 500 
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ session, setSession }}>
    <Router>
      <Routes>
        <Route path="/register" element={!session ? <Register /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />
        <Route
          path="/"
          element={session ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={session ? <About /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/design"
          element={session ? <Design /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/manual"
          element={<Manual />}
        />
        {/* catch-all */}
        <Route path="*" element={<Navigate to={session ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
    </SessionContext.Provider>
  );
};
export default App;

import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, HashRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import About from './pages/About';
import '../index.css';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://uxfupnubotknwkcthuep.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZnVwbnVib3RrbndrY3RodWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTU1MjEsImV4cCI6MjA3NjEzMTUyMX0.g_epxbwk6HMJVdq4uZaIAYIqNLCxmmJDqE9hbtKGoNc')

export const SessionContext = createContext<{ session: any | null; setSession: (s: any) => void } | null>(null);

const App = () => {
  const [session, setSession] = useState(null)
  useEffect(() => {
    let sub: any;
    (async () => {
      // Read session that supabase-js persisted to localStorage (browser behaviour)
      const { data: { session: current } } = await supabase.auth.getSession();
      setSession(current ?? null);

      // keep in sync with auth changes
      const res = supabase.auth.onAuthStateChange((_event, s) => setSession(s ?? null));
      sub = res.data.subscription;
    })();

    return () => sub?.unsubscribe?.();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={session ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={session ? <About /> : <Navigate to="/login" replace />}
        />
        {/* catch-all */}
        <Route path="*" element={<Navigate to={session ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
    </SessionContext.Provider>
  );
};


export default App;

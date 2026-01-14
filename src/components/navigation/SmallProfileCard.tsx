import React, { useEffect, useRef, useState } from 'react'
import { SessionContext, supabase } from '../App';
import { useContext } from 'react';

type Props = {}

const SmallProfileCard = (props: Props) => {

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleProfileClick = () => {
    setShowModal(true);
  }

  useEffect(() => {
    if (!showModal) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  if (showModal) {
    return (
      <div>
        <div className="small-profile-card">
          <div className='notification-bell'><img src="./images/bell.svg" alt="" /></div>
          <div className='profile-icon' onClick={handleProfileClick}><img src="./images/profile.png" alt="" /></div>
        </div>
        <div ref={modalRef}><SettingsModal onClose={() => setShowModal(false)} /></div>
      </div>
    );
  }

  return (
    <div className="small-profile-card">
        <div className='notification-bell'><img src="./images/bell.svg" alt="" /></div>
        <div className='profile-icon' onClick={handleProfileClick}><img src="./images/profile.png" alt="" /></div>
    </div>
  )
}

const SettingsModal = ({ onClose }: { onClose: () => void }) => {
  const ctx = useContext(SessionContext);
  const [view, setView] = useState<'main' | 'accessibility'>('main');

  async function handleLogout() {
    try {
      // Sign out from Supabase (clears localStorage and session)
      await supabase.auth.signOut();
      // Clear the context session state
      ctx?.setSession(null);
      onClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reduceMotion: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (view === 'accessibility') {
    return (
      <div className="settings-modal" style={{ minHeight: '12rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
          <button 
            onClick={() => setView('main')} 
            style={{ 
              width: 'auto', 
              padding: '0.25rem 0.5rem', 
              background: 'transparent', 
              color: '#333',
              fontSize: '1.2rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Accessibility</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span>High Contrast</span>
             <input 
               type="checkbox" 
               checked={settings.highContrast}
               onChange={() => toggleSetting('highContrast')}
             />
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span>Large Text</span>
             <input 
               type="checkbox" 
               checked={settings.largeText}
               onChange={() => toggleSetting('largeText')}
             />
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span>Reduce Motion</span>
             <input 
               type="checkbox" 
               checked={settings.reduceMotion}
               onChange={() => toggleSetting('reduceMotion')}
             />
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <button 
        onClick={() => setView('accessibility')}
        style={{ 
            marginBottom: '0.5rem', 
            backgroundColor: 'transparent', 
            color: '#333', 
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}
      >
        <span>Accessibility</span>
        <img src="./images/accessibility.svg" alt="" style={{ width: '1.2rem', height: '1.2rem' }}/>
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default SmallProfileCard
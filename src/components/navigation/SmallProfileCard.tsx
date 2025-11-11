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
        <div ref={modalRef}>{settingsModal(() => setShowModal(false))}</div>
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

const settingsModal = (onClose: () => void) => {
  const ctx = useContext(SessionContext);
    
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

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default SmallProfileCard
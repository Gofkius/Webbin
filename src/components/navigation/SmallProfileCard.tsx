import React from 'react'

type Props = {}

const SmallProfileCard = (props: Props) => {
  return (
    <div className="small-profile-card">
        <div className='notification-bell'><img src="src/images/bell.svg" alt="" /></div>
        <div className='profile-icon'><img src="src/images/profile.png" alt="" /></div>
    </div>
  )
}

export default SmallProfileCard
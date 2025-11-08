import React from 'react'
import Navbar from '../navigation/Navbar'
import { exportedUser } from '../auth/Login';

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
        <Navbar />
        <h1>Welcome {exportedUser?.email}</h1>
    </div>
  )
}

export default Home
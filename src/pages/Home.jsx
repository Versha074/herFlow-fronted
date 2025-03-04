import { Outlet } from 'react-router-dom';
import WhatTrack from './whatTrack';

function Home() {
  return (
    <>{/* Renders nested routes like Dashboard, Profile, etc. */}
      <Outlet />
    </>
  );
}

export default Home;
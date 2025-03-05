import { Outlet } from 'react-router-dom';
import WhatTrack from './whatTrack';
import Chatbot from '../components/ChatBot';

function Home() {
  return (
    <>{/* Renders nested routes like Dashboard, Profile, etc. */}
      <Chatbot />
      <Outlet />
    </>
  );
}

export default Home;
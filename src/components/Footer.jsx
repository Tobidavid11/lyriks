import React from 'react';
import "../styles/Footer.css";
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

export default function Footer() {
  return (
    <footer className='Footer-container'> 
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </footer>
  );
}

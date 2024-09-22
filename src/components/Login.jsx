import React from 'react';
import '../styles/login.css'; 
import lyriks from '../lyriks-logo.png';

const handleClick = () => {
  const clientId = "a6502244f81548b69c3f9b417a25c938";
  const redirectUrl = "http://localhost:3000/callback"; 
  const apiUrl = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-private",   
    "playlist-read-collaborative", 
  ];
  

  window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scope.join(' '))}&response_type=token&show_dialog=true`;
};

export default function Login() {
  return (
    <div className="login-container">
      <img src={lyriks} alt="lyriks" className="login-logo" />
      <button className="login-button" onClick={handleClick}>
        Explore Lyriks
      </button>
    </div>
  );
}

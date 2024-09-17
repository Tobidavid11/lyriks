// Corrected Playlists.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Moved to the top
import { useStateProvider } from '../utlis/StateProvider';

export default function Playlists() {
  const [{ token }, dispatch] = useStateProvider();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: "Bearer " + token
          },
        });
        setPlaylists(response.data.items); // Assuming 'items' holds the playlists array
        console.log(response.data.items); // Check if playlists are being fetched correctly
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  return (
    <div>
      <h1>My Playlists</h1>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) => <li key={playlist.id}>{playlist.name}</li>)
        ) : (
          <p>No playlists found.</p>
        )}
      </ul>
    </div>
  );
}

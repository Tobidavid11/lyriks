import React, { useEffect, useState } from 'react';
import "../styles/Playlists.css";
import axios from 'axios';
import { useStateProvider } from '../utlis/StateProvider';
import { reducerCases } from '../utlis/Constants';

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
        setPlaylists(response.data.items); 
        console.log(response.data.items); 
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {

    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      selectedPlaylistsId: selectedPlaylistId, 
    });
  }

  return (
    <div className='playlists-container'>
      <h3>Playlists</h3>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) =>
            <li key={playlist.id} onClick={() => changeCurrentPlaylist(playlist.id)}>
              {playlist.name}
            </li>
          )
        ) : (
          <p>No playlists found.</p>
        )}
      </ul>
    </div>
  );
}

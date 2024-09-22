import React, { useEffect } from 'react';
import { useStateProvider } from '../utlis/StateProvider';
import '../styles/CurrentTrack.css';
import axios from 'axios';
import { reducerCases } from '../utlis/Constants';

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.data && response.data.item) {
          const { item } = response.data;
          const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };

          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        }
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
      }
    };

    if (token) {
      fetchCurrentTrack();
    }
  }, [token, dispatch]);

  return (
    <div className='track-container'>
      {currentlyPlaying && (
        <div className="track">
          <div className="track-image">
            <img src={currentlyPlaying.image} alt="currently playing track" />
          </div>
          <div className="track-info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(', ')}</h6>
          </div>
        </div>
      )}
    </div>
  );
}

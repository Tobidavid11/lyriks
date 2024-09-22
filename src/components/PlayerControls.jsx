import React from 'react';
import "../styles/PlayerControls.css";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import axios from 'axios';
import { reducerCases } from '../utlis/Constants';
import { useStateProvider } from '../utlis/StateProvider';

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeTrack = async (type) => {
    try {
      const endpoint = type === 'next' ? 'next' : 'previous';

      await axios.post(`https://api.spotify.com/v1/me/player/${endpoint}`, {}, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

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
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }
    } catch (error) {
      console.error("Error changing track:", error.response ? error.response.data : error.message);
    }
  };

  const changeState = async () => {
    try {
      const state = playerState ? "pause" : "play";

      await axios.put(`https://api.spotify.com/v1/me/player/${state}`, {}, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
    } catch (error) {
      console.error("Error changing playback state:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <main className='controls-container'>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev />
      </div>
      <div className="state" onClick={changeState}>
        {playerState 
          ? <BsFillPauseCircleFill /> 
          : <BsFillPlayCircleFill />}
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </main>
  );
}

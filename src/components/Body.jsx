import React, { useEffect, useState } from 'react';
import "../styles/Body.css";
import { AiFillClockCircle } from 'react-icons/ai';
import { useStateProvider } from '../utlis/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utlis/Constants';

export default function Body() {
  const [{ token, selectedPlaylistsId, selectedPlaylist }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const getInitailPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistsId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const selectedPlaylists = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a") ? "" : response.data.description,
          image: response.data.images && response.data.images.length > 0 ? response.data.images[0].url : '',
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(", "),
            image: track.album.images && track.album.images.length > 0 ? track.album.images[2].url : '',
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };

        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: selectedPlaylists });
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    if (token && selectedPlaylistsId) {
      getInitailPlaylist();
    }
  }, [token, selectedPlaylistsId, dispatch]);

  const playTrack = (id, name, artists, image, context_uri, track_number) => {
    dispatch({
      type: reducerCases.SET_PLAYING_TRACK,
      playing: { id, name, artists, image, context_uri, track_number }
    });
  };

  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <main className='body-container'>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className='type'>PLAYLIST</span>
              <h1 className='title'>{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>          
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col"><span>#</span></div>
              <div className="col"><span>TITLE</span></div>
              <div className="col"><span>ALBUM</span></div>
              <div className="col"><span><AiFillClockCircle/></span></div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(({ id, name, artists, album, duration, image, context_uri, track_number }, index) => (
                <div
                  className="row"
                  key={id}
                  onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}  // Handle track click
                >
                  <div className="col"><span>{index + 1}</span></div>
                  <div className="col-detail">  
                    <div className="image"> 
                      <img src={image} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">{name}</span>
                      <span className="artist">{artists}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span className="album">{album}</span>
                  </div>
                  <div className="col">
                    <span className="duration">{msToMinutes(duration)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

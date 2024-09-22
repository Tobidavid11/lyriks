import React from 'react';
import "../styles/Volume.css";
import axios from 'axios';
import { useStateProvider } from '../utlis/StateProvider';

export default function Volume() {
    const [{ token }] = useStateProvider();

    const setVolume = async (e) => {
        try {
            const volume = parseInt(e.target.value);
            console.log(`Attempting to set volume to: ${volume}`);

            const response = await axios.put(
                'https://api.spotify.com/v1/me/player/volume',
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    params: {
                        volume_percent: volume,
                    },
                }
            );

            console.log("Volume successfully updated.", response);
        } catch (error) {
            console.error("Error setting volume:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <main className='volume-controller'>
            <input type="range" min={0} max={100} onChange={setVolume} />
        </main>
    );
}

import React, { useEffect, useRef, useState} from 'react';
import "../styles/lyriks.css";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utlis/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utlis/Constants';
export default function Lyriks() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef ();
 const [navBackground,setNavBackground] = useState (false);
 const [headerBackground,setHeaderBackground] = useState (false);
 const bodyScrolled = () => {
  bodyRef.current.scrollTop >= 30 
  ? setNavBackground (true)
   : setNavBackground(false);
  bodyRef.current.scrollTop >= 268
  ? setHeaderBackground (true)
   : setHeaderBackground(false);
 }
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        
        // Dispatch user info after fetching
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };

        dispatch({ type: reducerCases.SET_USER, userInfo });
        
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (token) {
      getUserInfo();
    }
  }, [dispatch, token]);

  return (
    <div className='lyriks-container'>
      <div className="lyriks-body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground = {navBackground}/>
          <div className="body-contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="lyriks-footer">
        <Footer />
      </div>
    </div>
  );
}

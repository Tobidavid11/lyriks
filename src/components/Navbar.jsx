import React from 'react';
import "../styles/Navbar.css";
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useStateProvider } from '../utlis/StateProvider';

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  return (
    <main 
      className={`navbar-container ${navBackground ? 'navbar-scrolled' : ''}`}
    >
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder='Artist, songs or podcasts' />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </main>
  );
}

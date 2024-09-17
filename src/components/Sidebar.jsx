import React from 'react'
import "../styles/Sidebar.css";
import logo from "../lyriks-logo-2.png";
import {IoLibrary} from 'react-icons/io5';
import {MdHomeFilled, MdSearch} from 'react-icons/md';
import Playlists from './Playlists';

export default function Sidebar() {
  return (
    <main className='Sidebar-container'>
      <div className="top-links">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul>
                        <li>
                          <MdHomeFilled/>
                          <span> Home </span>
                        </li>

          <li>
            <MdSearch/>
      <span>Search</span>
          </li>

          <li>
            <IoLibrary/>
<span>Your Library</span>
          </li>

        </ul>
      </div>
    <Playlists />
    </main>
  )
}

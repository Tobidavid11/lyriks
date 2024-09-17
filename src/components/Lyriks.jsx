import React from 'react'
import "../styles/lyriks.css";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
export default function Lyriks() {
  return (
    <div className='lyriks-container'>
<div className="lyriks-body">
    <Sidebar/>
    <div className="body">
        <Navbar/>
        <div className="body-contents">
            <Body/>
        </div>
    </div>
</div>
<div className="lyriks-footer">
<Footer />
</div>
    </div>
  )
}

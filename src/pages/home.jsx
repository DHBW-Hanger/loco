import React from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import '../css/modalsheet.css'
import Framework7 from 'framework7/.';

import {
  Page,
  Sheet,
} from 'framework7-react';


var app = new Framework7();

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <div className="navbar">
      <div className="navbar-bg"></div>
      <div className="navbar-inner">
    
      <p><a class="button button-fill sheet-open" onClick={myFunction} href="#" data-sheet=".my-sheet-swipe-to-step">Swipe To Step</a></p>
    
      </div>
    </div>

    {/* Page content */}
    <MyMap/>

   
  </Page>
);
export default HomePage;


function myFunction() {
 
// Create swipe-to-close Sheet
app.sheet.create({
  el: '.my-sheet-swipe-to-close',
  swipeToClose: true,
  backdrop: true,
});
}



/*
 <img className="logo" src="../img/logo.png" alt="Loco" />
        <div className="logo-text sliding">LOCO</div>
        <div className="right">
          <img src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="Avatar" className="avatar"></img>
        </div>
*/

// Create dynamic Sheet
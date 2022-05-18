import React from 'react';
import MyMap from '../components/map';
import '../css/index.css';

import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <div className="navbar">
      <div className="navbar-bg"></div>
      <div className="navbar-inner">
        <img className="logo" src="../img/logo.png" alt="Loco" />
        <div className="logo-text sliding">LOCO</div>
        <div className="right">
          <img src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="Avatar" className="avatar"></img>
        </div>
      </div>
    </div>

    {/* Page content */}
    <MyMap/>
  </Page>
);
export default HomePage;

import React from 'react';
import MyMap from '../components/map';
import "../css/index.css";

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
  Button
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
  {/* Top Navbar */}
  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner">
      <img class="logo" src="../img/logo.png" alt="Loco" />
      <div class="logotext sliding">LOCO</div>
      <div class="right">
        <img src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="Avatar" class="avatar"></img>
      </div>
    </div>
  </div>

    {/* Page content */}
    <MyMap/>
  </Page>
);
export default HomePage;
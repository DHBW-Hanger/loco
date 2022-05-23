import React from 'react';
import MyMap from '../components/map';
import '../css/index.css';

import {
  Link, Navbar,
  NavRight,
  Page, Searchbar, theme,
  // NavLeft,
  // NavTitle,
  // NavTitleLarge,
  // NavRight,
  // Link,
  // Toolbar,
  // Block,
  // BlockTitle,
  // List,
  // ListItem,
  // Row,
  // Col,
  // Button,
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar>
      <img className="logo" src="../img/logo.png" alt="Loco" />
      <div className="logo-text sliding">LOCO</div>
        <NavRight>
            <Link
              searchbarEnable=".searchbar-demo"
              iconIos="f7:search"
              iconAurora="f7:search"
              iconMd="material:search"
            ></Link>
          </NavRight>
          <Searchbar
            className="searchbar-demo"
            expandable
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButton={!theme.aurora}
          ></Searchbar>
        </Navbar>

      {/* Page content */}
    <MyMap/>
  </Page>
);
export default HomePage;

import React from 'react';
import '../css/index.css';

import {App, Views, View} from 'framework7-react';


import HomePage from './home';

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'Loco', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: {
      path: '/',
      component: HomePage,
    },
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV === 'production' ? {
      path: '/service-worker.js',
    } : {},
  };

  return (
    <App {...f7params}>
      {/* Views/Tabs container */}
      <Views tabs className="safe-areas" color="pink">
        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View id="view-home" main tab tabActive url="/"/>
      </Views>
    </App>
  );
};
export default MyApp;

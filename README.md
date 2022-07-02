# Loco

[![ESLint](https://github.com/DHBW-Hanger/loco/actions/workflows/eslint.yml/badge.svg)](https://github.com/DHBW-Hanger/loco/actions/workflows/eslint.yml)
[![StyleLint](https://github.com/DHBW-Hanger/loco/actions/workflows/stylelint.yml/badge.svg)](https://github.com/DHBW-Hanger/loco/actions/workflows/stylelint.yml)
[![HTMLHint](https://github.com/DHBW-Hanger/loco/actions/workflows/htmlhint.yml/badge.svg)](https://github.com/DHBW-Hanger/loco/actions/workflows/htmlhint.yml)

This project is made for WebEngineering2 (DHBW).
The goal is to create a location based PWA.

## Links
Hosted PWA:

[locomap.de](https://locomap.de)

[Jira](https://projectxtasks.atlassian.net/jira/software/projects/PD/pages)

## Used Frameworks and APIs

[reactjs](https://reactjs.org/)
[Framework7](https://leafletjs.com/)
[leaflet](https://framework7.io/)
[leaflet routing machine](https://www.liedman.net/leaflet-routing-machine/)
[maptiler](https://www.maptiler.com/)


## Install Dependencies

First we need to install dependencies, run in terminal:
```shell
npm install
```

## Used Linters

HTMLHint for HTML:
```shell
npx htmlhint "**/*.html"
```

StyleLint for CSS:
```shell
npx stylelint "**/*.{css,scss}"
```

EsLint for JavaScript
```shell
npx eslint . --ext .js,.jsx
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project, so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts, so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Framework7 CLI Options

Framework7 app created with following options:

```json
{
  "cwd": "/Users/lucakaiser/DH/Loco",
  "type": [
    "pwa",
    "web"
  ],
  "name": "Loco",
  "framework": "react",
  "template": "tabs",
  "cssPreProcessor": false,
  "bundler": "vite",
  "theming": {
    "customColor": true,
    "color": "#7CA982",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```




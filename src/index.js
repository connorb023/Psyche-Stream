import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const html = ReactDOMServer.renderToString(<App />);

const template = `<!DOCTYPE html>
<html>
  <head>
    <title>My Mood Tracker App</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`;

export default template;

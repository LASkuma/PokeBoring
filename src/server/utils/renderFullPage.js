import assets from '../../../webpack-assets.json';

if (process.env.NODE_ENV === 'development') {
  assets.vendor.js = '/build/static/vendor.js';
  assets.main.js = '/build/static/main.js';
}

const render = (html, initialState) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>PokeBoring</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
        <script src="${assets.vendor.js}"></script>
        <script src="${assets.main.js}"></script>
      </body>
    </html>
  `
};

export default render;

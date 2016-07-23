import { resolve } from 'path'
import minimist from 'minimist'
// Webpack related
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.config.dev'

// Express stuff
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'

// React & Redux
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router'

// Lifecycle hook
import { trigger } from 'redial'

import renderFullPage from './utils/renderFullPage'
import getLocation from './utils/getLocation'
import { configureStore } from '../common/store/configureStore'
import createRoutes from '../common/routes/root'

const server = express()
const port = process.env.PORT || 3000
const devMode = process.env.NODE_ENV == 'development'

server.disable('x-powered-by')
server.set('port', port)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(compression())

if (devMode) {
  server.use(morgan('dev'))
  const conf = config()
  const compiler = webpack(conf)
  const middleware = webpackMiddleware(compiler, {
    publicPath: conf.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: true,
      modules: false,
    }
  })
  server.use(middleware)
  server.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
}

if (!devMode) {
  server.use('/static', express.static(resolve(__dirname, '../../dist')))
}

const wildCardHandler = (req, res) => {
  const store = configureStore()
  const routes = createRoutes(store)
  const history = createMemoryHistory(req.path)
  const { dispatch } = store

  match({ routes, history }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Internal Server Error.')
    }

    if (!renderProps) {
      return res.status(404).send('Not Found')
    }
    const { components } = renderProps
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    }

    trigger('fetch', components, locals)
      .then(() => {
        const initialState = store.getState()
        const initialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const html = ReactDOM.renderToString(initialView)
        res.status(200).send(renderFullPage(html, initialState))
      })
      .catch(console.error)
  })
}



const argv = minimist(process.argv.slice(2))
if (typeof(argv.l) !== "string") {
  console.err("Location must be provided after -l flag")
  process.exit(1)
}

const locationString = argv.l
getLocation(locationString)
  .then((location, err) => {
    server.get('/init', (req, res) => {
      let googleMapKey;
      if (typeof(argv.gkey !== "string")) {
        googleMapKey = require('../../credential.json').gmaps_key
      } else {
        googleMapKey = argv.gkey
      }
      res.json({
        lat: location.latitude,
        lng: location.longitude,
        apiKey: googleMapKey
      })
    })

    server.get('*', wildCardHandler)

    server.listen(port, (error) => {
      if (error) {
        console.error(error)
      } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
      }
    })
  })

module.exports = server

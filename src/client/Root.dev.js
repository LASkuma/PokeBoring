import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider } from 'react-redux'

import DevTools from '../common/containers/DevTools';

import { trigger } from 'redial'

// Your app's reducer and routes:
import createRoutes from '../common/routes/root'
import { configureStore } from '../common/store/configureStore'

const initialState = window.INITIAL_STATE || {}

// Set up Redux (note: this API requires redux@>=3.1.0):
const store = configureStore(initialState)
const { dispatch } = store
const { pathname, search, hash } = window.location
const routes = createRoutes(store)

// Render app with Redux and router context to container element:
match({ routes, location }, () => {
  render((
    <Provider store={store}>
      <div>
        <Router history={browserHistory} routes={routes} />
        <DevTools />
      </div>
    </Provider>
  ), document.getElementById('root'))
})

browserHistory.listen(location => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const { components } = renderProps

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    }

    // Don't fetch data for initial route, server has already done the work:
    if (window.INITIAL_STATE) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.INITIAL_STATE;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals);
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals);
  })
})

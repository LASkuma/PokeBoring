import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from '../reducers';
import api from '../middleware/api';

export function configureStore(initialState = {}) {
  let store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(thunk,api)
  )

  store.asyncReducers = {}

  return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

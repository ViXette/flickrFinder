import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from '../reducers/rootReducer'
import fetchDataEpic from '../epic'


let middleware = [createEpicMiddleware(fetchDataEpic)]


export default configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}

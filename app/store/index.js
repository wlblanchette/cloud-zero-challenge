import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import simpleApp from './../reducers'

var store = createStore(
  simpleApp,
  applyMiddleware(thunk)
)

export default store
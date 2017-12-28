import { createStore } from 'redux'
import simpleApp from './../reducers'

var store = createStore(simpleApp)

export default store
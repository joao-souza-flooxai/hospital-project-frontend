import { combineReducers, createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { positionReducer } from './reducers/positionReducer'

const rootReducer = combineReducers({
  positions: positionReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

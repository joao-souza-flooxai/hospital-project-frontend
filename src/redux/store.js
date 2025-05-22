import { combineReducers, createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { positionReducer } from './reducers/positionReducer'
import { authReducer } from './reducers/authReducer'
const rootReducer = combineReducers({
  positions: positionReducer,
  auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

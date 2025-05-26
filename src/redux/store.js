import { combineReducers, createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { positionReducer } from './reducers/positionReducer'
import { authReducer } from './reducers/authReducer'
import { leaderboardReducer } from './reducers/leaderBoardReducer'
import applicationReducer from './reducers/applicationReducer'
const rootReducer = combineReducers({
  positions: positionReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer,
  application: applicationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

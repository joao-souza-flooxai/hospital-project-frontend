import { combineReducers, createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { positionReducer } from './reducers/positionReducer'
import { authReducer } from './reducers/authReducer'
import { leaderboardReducer } from './reducers/leaderBoardReducer'
import applicationReducer from './reducers/applicationReducer'
import adminPositionsReducer from './reducers/adminPositionReducer'
import adminApplicationsReducer from './reducers/adminApplicationReducer'
import {preferencesReducer} from "./reducers/preferencesReducer"

const rootReducer = combineReducers({
  positions: positionReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer,
  application: applicationReducer,
  adminPositions: adminPositionsReducer,
  adminApplications: adminApplicationsReducer,
  preferences: preferencesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import foods from './foods'
import commonReducer from './common'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    common: commonReducer,
    foods
  })
}

export default createRootReducer

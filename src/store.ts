import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { PaginationReducer } from './features/pagination'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: PaginationReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store

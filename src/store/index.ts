import { createStore, combineReducers, applyMiddleware, compose, Middleware, Reducer } from 'redux'
import  reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import { IStoreState, IAction } from './types'
import userReducer from './module/user'
import appReducer from './module/app'
import settingsReducer from './module/settings'
import tagReducer from './module/tags'


const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState> ({
  user: userReducer,
  app: appReducer,
  settings: settingsReducer,
  tags: tagReducer
})


const middleware: Middleware[] = [reduxThunk]

if (process.env.REACT_APP_RUN_MODE !== 'production') {
  middleware.push(reduxLogger)
}

function createMyStore () {
  
  const store = window.__REDUX_DEVTOOLS_EXTENSION__ ? 
  createStore(reducers, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})))
  : createStore(reducers, applyMiddleware(...middleware))

  return store
}

const store = createMyStore()

export default store
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'

import { counterReducer } from './reducers'
import { messageReducer } from './reducers'




export const Reducers = combineReducers({
  counterState: counterReducer,
  messageState: messageReducer,
  //otherState: otherReducer,
});

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  Reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

export default store;
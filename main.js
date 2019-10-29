import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import Counter from './Counter'

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


const action = type => store.dispatch({type})

const addMessage = (message, author) => store.dispatch({
  type: 'ADD_MESSAGE',
  message,
  author
})


function render() {
  
  console.log(store.getState())
  
  ReactDOM.render(
    <Counter
      value={store.getState().counterState}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      fetchPostsAsync={() => action('FETCH_POSTS_ASYNC')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} 
      onAddMessage={() => addMessage("mensagem bla bla", "Pedro da Silva")} 
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

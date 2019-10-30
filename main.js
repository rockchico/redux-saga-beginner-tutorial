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
  type: 'ADD_MESSAGE_ACTION',
  message,
  author
})

const delMessage = (id) => store.dispatch({
  type: 'DEL_MESSAGE_ACTION',
  id
})


// exemplo generator
function *generatorFunction(i) {
  //console.log(i);
  const j = 5 * (yield (i * 10));
  //console.log(j);
  const k = yield (2 * j / 4);
  //console.log(k)
  return (i + j + k)
}

var generator = generatorFunction(10)
//console.log( generator.next(20) )
//console.log( generator.next(10) )
//console.log( generator.next(5) )
// fim exemplo generator



function render() {
  
  console.log(store.getState())
  
  ReactDOM.render(
    <Counter
      value={store.getState().counterState}
      messages={store.getState().messageState}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      fetchPostsAsync={() => action('FETCH_POSTS_ASYNC')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onDelMessage={() => delMessage(10)} 
      onAddMessage={() => addMessage("mensagem bla bla", "Pedro da Silva")} 
      onAddBulkMessage={() => action("BULK_MESSAGE_ACTION")} 
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


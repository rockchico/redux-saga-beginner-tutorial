import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import Counter from './Counter'

const action = type => store.dispatch({type})

const addMessage = (message, author) => store.dispatch({
  type: 'ADD_MESSAGE_ACTION',
  message,
  author
})

const delMessage = id => store.dispatch({
  type: 'DEL_MESSAGE_ACTION',
  id: id
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
      store={store}
      value={store.getState().counterState}
      messages={store.getState().messageState}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      fetchPostsAsync={() => action('FETCH_POSTS_ASYNC')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onAddMessage={() => addMessage("mensagem bla bla", "Pedro da Silva")} 
      onDelMessage={() => delMessage() } 
      onAddBulkMessage={() => action("BULK_MESSAGE_ACTION")} 
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


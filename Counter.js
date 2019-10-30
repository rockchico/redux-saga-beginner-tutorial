/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>id: {item.id} - {item.author} - {item.message}</li>
    ))}
  </ul>
);

const Counter = ({ value, messages, onIncrement, onDecrement, onIncrementAsync, fetchPostsAsync, onAddMessage, onDelMessage, onAddBulkMessage }) =>
      <div>
        <button onClick={onAddMessage}>
          Add message
        </button>
        {' '}
        <button onClick={onDelMessage}>
          Del message
        </button>
        {' '}
        <button onClick={onAddBulkMessage}>
          Add Bulk message
        </button>
        {' '}
        
        <button onClick={fetchPostsAsync}>
          Fetch Posts
        </button>
        {' '}
        
        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
        <div>
          <List list={messages} />
        </div>
      </div>

Counter.propTypes = {
  messages: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  fetchPostsAsync: PropTypes.func.isRequired,
  onAddMessage: PropTypes.func.isRequired,
  onDelMessage: PropTypes.func.isRequired,
  onAddBulkMessage: PropTypes.func.isRequired
}

export default Counter

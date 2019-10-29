/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, fetchPostsAsync, onAddMessage }) =>
      <div>
        <button onClick={onAddMessage}>
          Add message
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
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  fetchPostsAsync: PropTypes.func.isRequired,
  onAddMessage: PropTypes.func.isRequired
}

export default Counter

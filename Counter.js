/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import { delMessage } from './actions'




const Counter = ({ messages, onAddMessage, onAddBulkMessage, onDelMessage }) =>
      <div>
        <button onClick={onAddMessage}>
          Add message
        </button>
        
        {' '}
        <button onClick={onAddBulkMessage}>
          Add Bulk message
        </button>
        {' '}
        
        
        <div>
        <ul>
          {messages.map((item) => (
            <li key={item.id}>id: {item.id} - {item.author} - {item.message} <button onClick={() => delMessage( item.id )}>Del message</button></li>
          ))}
        </ul>
        </div>
      </div>

Counter.propTypes = {
  messages: PropTypes.array.isRequired,
  onAddMessage: PropTypes.func.isRequired,
  onAddBulkMessage: PropTypes.func.isRequired
}

export default Counter

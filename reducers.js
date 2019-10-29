export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export const messageReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return state.concat([{
        message: action.message,
        author: action.author
      }])

    case 'BULK_MESSAGE':
        console.log('passou no bulk')
        console.log(action.messages)
        
        action.messages.map((item) => (
          state.concat([{ 
            message: item.body,
            author: item.title
          }])
        ))

        return state = action.messages;


    default:
    return state
  }
}

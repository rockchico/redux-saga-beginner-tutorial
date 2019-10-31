import store from './store'

export const delMessage = id => store.dispatch({
    type: 'DEL_MESSAGE_ACTION',
    id: id
})
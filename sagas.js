import { put, takeEvery, takeLatest, take, all, call } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...
export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// Our worker Saga: will perform the async increment task
export function* fetchAsync() {
    
    const URL_TO_FETCH = 'https://jsonplaceholder.typicode.com/posts';

    yield fetch(URL_TO_FETCH)
    .then(function(response){
        response.json().then(function(data){
            console.log(data); 
        });
    })
    .catch(function(err){ 
        console.error('Failed retrieving information', err);
    });

    yield put({ type: 'INCREMENT' });

    
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchFetchAsync() {
    //yield takeEvery('FETCH_POSTS_ASYNC', fetchAsync)
    yield takeLatest('FETCH_POSTS_ASYNC', fetchAsync)
    
}


export function* fetchAsyncMessages() {
    
    //const URL_TO_FETCH = 'https://jsonplaceholder.typicode.com/posts';
    const URL_TO_FETCH = 'http://localhost:3000/messages';

    try {
        yield delay(1000)
        const response = yield call(fetch, URL_TO_FETCH);
        const responseBody = yield response.json();

        yield put({ type: 'BULK_MESSAGE', messages: responseBody })
        
     } catch (error) {
        yield put({type: "FETCH_FAILED", error})
     }
}

export function* addMessage() {


    try {
        yield delay(1000)
        yield put({ type: 'ADD_MESSAGE', message: "faifoadsfi oasdifoasi", author: "Jose" })
        
     } catch (error) {
        yield put({type: "FETCH_FAILED", error})
     }
}

export function* delMessage(params) {

    console.log(params)

    try {
        const response = yield call(fetch, 'http://localhost:3000/messages');
        const responseBody = yield response.json();

        yield put({ type: 'DEL_MESSAGE', id: params.id })
        
     } catch (error) {
        yield put({type: "FETCH_FAILED", error})
     }
}



export function* watchFetchAsyncMessages(params) {
    
    // executa cada vez que a action for executada
    yield takeEvery('BULK_MESSAGE_ACTION', fetchAsyncMessages);

    // executa somente na primeira vez que a action é executada
    //yield take('ADD_MESSAGE', fetchAsyncMessages);

    // se uma ação ADD_MESSAGE for executada quando outra estiver sendo executada, pega somente o valor da segunda ação e cancela a primeira
    //yield takeLatest('ADD_MESSAGE', fetchAsyncMessages)

    
    //yield put({ type: 'BULK_MESSAGE' });
}

export function* watchAddMessage(params) {
    
    // executa cada vez que a action for executada
    yield takeEvery('ADD_MESSAGE_ACTION', addMessage);

}

export function* watchDelMessage(params) {
    

    // executa cada vez que a action for executada
    yield takeEvery('DEL_MESSAGE_ACTION', delMessage);

}

// https://gist.github.com/rowlandekemezie/f559ec88da8ff348913820d2da3e8ed7

export default function* rootSaga() {
    yield all([
      helloSaga(),
      watchIncrementAsync(),
      watchFetchAsync(),
      watchFetchAsyncMessages(),
      watchAddMessage(),
      watchDelMessage()
    ])
}
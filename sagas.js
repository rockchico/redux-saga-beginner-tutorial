import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects'

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
    

    



    const URL_TO_FETCH = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = yield call(fetch, URL_TO_FETCH);
        const responseBody = yield response.json();
        //console.log(responseBody); 
        yield put({ type: 'BULK_MESSAGE', messages: responseBody });
     } catch (error) {
        yield put({type: "FETCH_FAILED", error})
     }

    

    
}



export function* watchFetchAsyncMessages(params) {
    
    yield takeEvery('ADD_MESSAGE', fetchAsyncMessages);

    
    //yield put({ type: 'BULK_MESSAGE' });
  }

export default function* rootSaga() {
    yield all([
      helloSaga(),
      watchIncrementAsync(),
      watchFetchAsync(),
      watchFetchAsyncMessages()
    ])
}
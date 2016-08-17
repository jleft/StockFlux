import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers/reducers';
import persistState from 'redux-localstorage';

const enhancer = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware),
    persistState()
);

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    return store;
}

export default configureStore;

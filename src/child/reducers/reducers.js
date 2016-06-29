import { combineReducers } from 'redux';

import selection from './selection';
import sidebar from './sidebar';
import favourites from './favourites';
import search from './search';
import windowState from './windowState';

// TODO: change state shape

const windowReducer = combineReducers({
    selection,
    sidebar,
    favourites,
    search,
    windowState
});

const windows = (state = [], action) => {
    switch (action.type) {
    case 'OPEN_WINDOW_RESQUEST':
        return [...state, windowReducer(undefined, action)];
    default:
        return state.map(childWindowState => windowReducer(childWindowState, action));
    }
};

const rootReducer = combineReducers({
    windows
});

// Wrap the reducer in dev to freeze the state and action
const checkImmutable = (reducer) => {
    if (process.env.NODE_ENV === 'production') {
        return require('./reducers.prod').default(reducer);     // eslint-disable-line global-require
    }
    return require('./reducers.dev').default(reducer);          // eslint-disable-line global-require
};

export default checkImmutable(rootReducer);

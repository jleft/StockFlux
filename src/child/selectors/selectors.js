import { createSelector } from 'reselect';
import currentWindowService from '../services/currentWindowService';

const getCurrentWindowState = (state) => state[currentWindowService.getCurrentWindow().name];
const createWindowStateSelector = (...args) => createSelector(getCurrentWindowState, ...args);

// TODO: create factory functions to return new instance of each selector?
// For better performance across instances
// export const appSelector = () => createWindowStateSelector(
export const appSelector = createWindowStateSelector(
    (state) => {
        const { selection, windowState } = state;
        const { name, code } = selection;
        return { name, code, windowState };
    }
);

export const favouritesSelector = createWindowStateSelector(
    (state) => {
        const { favourites, selection, windowState } = state;
        return { favourites, selection, windowState, isStarting: false, hasErrors: false };
    }
);

export const searchSelector = createWindowStateSelector(
    (state) => {
        const { favourites, selection } = state;
        const { isSearching, hasErrors, results, term } = state.search;
        return { favourites, isSearching, hasErrors, results, term, selection };
    }
);

export const sidebarSelector = createWindowStateSelector(
    (state) => {
        const { sidebar, selection, favourites, windowState } = state;
        return { sidebar, selection, favourites, windowState };
    }
);

export const toolbarSelector = createWindowStateSelector(
    (state) => {
        const { windowState } = state;
        return { windowState };
    }
);

import { WINDOW as ACTION_TYPES } from '../../shared/constants/actionTypes';
import configService from '../../shared/ConfigService';
import createActionCreator from '../utils/createActionCreator';
import currentWindowService from '../services/currentWindowService';

export const minimize = createActionCreator(() => ({
    type: ACTION_TYPES.MINIMIZE
}));

export const compact = createActionCreator((isMaximized) => ({
    type: ACTION_TYPES.TOGGLE_COMPACT,
    isCompact: true,
    previousMaximizedState: isMaximized
}));

export const expand = createActionCreator(() => ({
    type: ACTION_TYPES.TOGGLE_COMPACT,
    isCompact: false
}));

export const resizing = createActionCreator(() => ({
    type: ACTION_TYPES.RESIZING
}));

export const fullView = createActionCreator(() => ({
    type: ACTION_TYPES.STATE_FULL_VIEW
}));

export const maximize = createActionCreator(() => ({
    type: ACTION_TYPES.MAXIMIZE
}));

export const restore = createActionCreator(() => ({
    type: ACTION_TYPES.RESTORE
}));

export const open = createActionCreator(() => ({
    type: ACTION_TYPES.OPEN
}));

export const windowResized = createActionCreator((dimensions) => ({
    type: ACTION_TYPES.WINDOW_RESIZED,
    previousExpandedDimensions: dimensions
}));

function getWindowStateForCurrentWindow(getState) {
    return getState().childWindows[currentWindowService.getCurrentWindowName()].windowState;
}

export const minimizeWindow = createActionCreator(() => ({
    type: ACTION_TYPES.RESIZING,
    payload: new Promise((resolve, reject) => {
        fin.desktop.Window.getCurrent().minimize(resolve, reject);
    })
}));

export const maximizeWindow = createActionCreator(() => ({
    type: ACTION_TYPES.RESIZING,
    payload: new Promise((resolve, reject) => {
        fin.desktop.Window.getCurrent().maximize(resolve, reject);
    })
}));

export const restoreWindow = createActionCreator(() => ({
    type: ACTION_TYPES.RESIZING,
    payload: new Promise((resolve, reject) => {
        fin.desktop.Window.getCurrent().restore(resolve, reject);
    })
}));

const updateOptions = createActionCreator((options) => ({
    type: ACTION_TYPES.UPDATING_OPTIONS,
    payload: new Promise((resolve, reject) => {
        currentWindowService.updateOptions(options, resolve, reject);
    })
}));

const resize = createActionCreator((width, height, anchor) => ({
    type: ACTION_TYPES.RESIZING,
    payload: new Promise((resolve, reject) => {
        currentWindowService.resizeTo(width, height, anchor, resolve, reject);
    })
}));

export function resizeToCompact() {
    return dispatch => {
        const [minWidth, minHeight] = configService.getCompactWindowDimensions();
        const options = {
            resizable: false,
            maximizable: false,
            minWidth,
            minHeight
        };
        const [compactWindowWidth, compactWindowHeight] = configService.getCompactWindowDimensions();
        return Promise.all([
            dispatch(updateOptions(options)),
            dispatch(resize(compactWindowWidth, compactWindowHeight, 'top-right'))
        ]);
    };
}

export function resizeToPrevious() {
    return (dispatch, getState) => {
        const [minWidth, minHeight] = configService.getDefaultWindowMinDimensions();
        const options = {
            resizable: true,
            maximizable: true,
            minWidth,
            minHeight
        };
        const [previousWindowWidth, previousWindowHeight] = getWindowStateForCurrentWindow(getState).previousExpandedDimensions;
        return Promise.all([
            dispatch(updateOptions(options)),
            dispatch(resize(previousWindowWidth, previousWindowHeight, 'top-right'))
        ]);
    };
}

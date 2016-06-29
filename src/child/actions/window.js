import { WINDOW as ACTION_TYPES } from '../constants/actionTypes.js';
import configService from '../../shared/ConfigService';

export function minimise() {
    return {
        type: ACTION_TYPES.MINIMIZE
    };
}

export function compact() {
    return {
        type: ACTION_TYPES.TOGGLE_COMPACT,
        state: true
    };
}

export function expand() {
    return {
        type: ACTION_TYPES.TOGGLE_COMPACT,
        state: false
    };
}

export function resizing() {
    return {
        type: ACTION_TYPES.RESIZING
    };
}

export function fullView() {
    return {
        type: ACTION_TYPES.STATE_FULL_VIEW
    };
}

export function maximize() {
    return {
        type: ACTION_TYPES.MAXIMIZE
    };
}

export function restore() {
    return {
        type: ACTION_TYPES.RESTORE
    };
}

export function close() {
    return {
        type: ACTION_TYPES.CLOSE
    };
}

export function resizeError() {
    return {
        type: ACTION_TYPES.RESIZE_ERROR
    };
}

export function resizeToCompact() {
    return dispatch => {
        dispatch(resizing());
        const compactWindowDimensions = configService.getCompactWindowDimensions();
        fin.desktop.Window.getCurrent().resizeTo(
            compactWindowDimensions[0],
            compactWindowDimensions[1],
            'top-right',
            () => dispatch(compact()),
            () => dispatch(resizeError())
        );
    };
}

export function resizeToDefault() {
    return dispatch => {
        dispatch(resizing());
        const defaultWindowDimensions = configService.getDefaultWindowDimensions();
        fin.desktop.Window.getCurrent().resizeTo(
            defaultWindowDimensions[0],
            defaultWindowDimensions[1],
            'top-right',
            () => dispatch(expand()),
            () => dispatch(resizeError())
        );
    };
}

function openWindowRequest(config) {
    return {
        type: 'OPEN_WINDOW_RESQUEST',
        config
    };
}

function openWindowSuccess() {
    return {
        // type: ACTION_TYPES.OPEN_WINDOW_SUCCESS
        type: 'OPEN_WINDOW_SUCCESS'
    };
}

function openWindowFailure(error) {
    return {
        type: ACTION_TYPES.OPEN_WINDOW_FAILURE,
        error
    };
}

function showWindowRequest() {
    return {
        // type: ACTION_TYPES.SHOW_WINDOW_REQUEST
        type: 'SHOW_WINDOW_REQUEST'
    };
}

function showWindowSuccess() {
    return {
        // type: ACTION_TYPES.SHOW_WINDOW_SUCCESS
        type: 'SHOW_WINDOW_SUCCESS'
    };
}

function showWindowFailure(error) {
    return {
        type: ACTION_TYPES.SHOW_WINDOW_FAILURE,
        error
    };
}

function showWindow(windowToShow) {
    return dispatch => {
        dispatch(openWindowSuccess());
        dispatch(showWindowRequest());
        windowToShow.show(
            () => dispatch(showWindowSuccess()),
            () => dispatch(showWindowFailure())
        );
    };
}

export function openWindow(config) {
    return dispatch => {
        dispatch(openWindowRequest(config));
        const newWindow = new fin.desktop.Window( // eslint-disable-line
            config,
            () => dispatch(showWindow(newWindow)),
            () => dispatch(openWindowFailure())
        );
    };
}

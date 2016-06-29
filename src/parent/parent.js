import configService from '../shared/ConfigService';
import configureStore from '../child/store/configureStore';
import 'babel-polyfill';

//
// function windows(state = {}, action) {
//     switch (action.type) {
//     case TOGGLE_TODO:
//         return state.map((window, index) => {
//             if (index === action.index) {
//                 return Object.assign({}, todo, {
//                     completed: !todo.completed
//                 });
//             }
//             return todo;
//         })
//     default:
//         return state;
//     }
// }
//
// const TEST = 'test';
// function updateWindowBykey(state = {}, action) {
//     switch (action.type) {
//     case TEST:
//         const windowKey = action.window;
//         return merge({}, state, windowReducer(state[windowKey], action));
//     default:
//         return state;
//     }
// }

const store = configureStore();

store.dispatch({ type: 'ADD_WINDOW', config: {} });

function successCb() {
    this.show();
}

function errCb(err) {
    console.error(err);
}

function createMainWindow(id) {
    window.store = store;

    const config = configService.getWindowConfig();

    const mainWindow = new fin.desktop.Window(
        config,
        successCb,
        errCb
    );

    mainWindow.customId = id;

    const closedEvent = () => {
        // Close the application
        // only close when all windows are closed
        window.close();
    };

    mainWindow.addEventListener('closed', closedEvent);
}

fin.desktop.main(() => createMainWindow(1));
fin.desktop.main(() => createMainWindow(2));

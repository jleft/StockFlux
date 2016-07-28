import configService from '../../shared/ConfigService';
import { close } from '../actions/parent';

class ParentService {

    constructor(store) {
        this.store = store;
        this.onChildClosed = this.onChildClosed.bind(this);
    }

    onChildClosed({ name }) {
        this.store.dispatch(close(name));
    }

    createChildWindowSuccess(childWindow) {
        childWindow.show();
        childWindow.addEventListener('closed', this.onChildClosed);
    }

    createChildWindow(windowName) {
        const childWindow = new fin.desktop.Window(
            configService.getWindowConfig(windowName),
            () => this.createChildWindowSuccess(childWindow)
        );
    }

    start() {
        fin.desktop.Window.getCurrent().contentWindow.store = this.store;

        // Subscribe to the store so we can avoid having the side effect
        // of closing the parent window in a reducer
        this.store.subscribe(() => {
            if (!Object.keys(this.store.getState()).length) {
                fin.desktop.Window.getCurrent().contentWindow.close();
            }
        });

        if (!Object.keys(fin.desktop.Window.getCurrent().contentWindow.store.getState()).length) {
            this.createChildWindow();
        } else {
            Object.keys(fin.desktop.Window.getCurrent().contentWindow.store.getState()).forEach((windowName) => {
                const newWindowName = windowName === 'undefined' ? null : windowName;
                this.createChildWindow(newWindowName);
            });
        }
    }

}

export default ParentService;

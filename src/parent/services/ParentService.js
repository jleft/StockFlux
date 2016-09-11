import configService from '../../shared/ConfigService';
import { close } from '../actions/parent';
import { toggleFavouriteInWindow } from '../../child/actions/favourites';

class ParentService {

    constructor(store) {
        this.store = store;
        this.onChildClosed = this.onChildClosed.bind(this);

        fin.desktop.InterApplicationBus.subscribe(
            fin.desktop.Application.getCurrent().uuid,
            'createChildWindow',
            position => this.createChildWindow({ position })
        );
    }

    getChildWindowCount() {
        return Object.keys(this.store.getState().childWindows).length;
    }

    onChildClosed({ name }) {
        this.store.dispatch(close(name));

        // Close the main parent window if all child windows are closed
        if (this.getChildWindowCount() === 0) {
            fin.desktop.Window.getCurrent().contentWindow.close();
        }
    }

    createChildWindowSuccess(childWindow, position, firstWindow) {
        if (position) {
            childWindow.setBounds(position[0], position[1]);
        }
        if (firstWindow) {
            const defaultStocks = ['AAPL', 'MSFT', 'TITN', 'TSLA'];
            defaultStocks.forEach((code) => {
                this.store.dispatch(toggleFavouriteInWindow(code, childWindow.name));
            });
        }
        childWindow.show();
        childWindow.addEventListener('closed', this.onChildClosed);
    }

    createChildWindow({ windowName, position, firstWindow }) {
        let windowConfig;
        if (windowName) {
            const { windowState } = this.store.getState().childWindows[windowName];
            if (windowState.isCompact) {
                windowConfig = configService.getCompactWindowConfig(windowName);
            } else if (windowState.isMaximized) {
                windowConfig = configService.getMaximizedWindowConfig(windowName);
            } else {
                windowConfig = configService.getWindowConfig(windowName);
            }
        } else {
            windowConfig = configService.getWindowConfig();
        }

        const childWindow = new fin.desktop.Window(
            windowConfig,
            () => this.createChildWindowSuccess(childWindow, position, firstWindow)
        );
    }

    start() {
        fin.desktop.Window.getCurrent().contentWindow.store = this.store;

        if (this.getChildWindowCount() === 0) {
            this.createChildWindow({ firstWindow: true });
        } else {
            Object.keys(this.store.getState().childWindows).forEach((windowName) => {
                const newWindowName = windowName === 'undefined' ? null : windowName;
                this.createChildWindow({ windowName: newWindowName });
            });
        }
    }

}

export default ParentService;

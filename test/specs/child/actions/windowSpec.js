import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { minimize,
         compact,
         expand,
         fullView,
         maximize,
         restore,
         resizing,
         open,
         resizeToCompact,
         resizeToPrevious,
         __RewireAPI__ as rewiredActions } from '../../../../src/child/actions/window';
import { WINDOW as ACTION_TYPES } from '../../../../src/shared/constants/actionTypes';

describe('child/actions/window', () => {
    it('should create an action for minimize', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.MINIMIZE };
        const actualAction = minimize();
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for compact', () => {
        const previousMaximizedState = false;
        const previousExpandedDimensions = [1000, 1000];
        const expectedAction = {
            windowName: 'window0002',
            type: ACTION_TYPES.TOGGLE_COMPACT,
            isCompact: true,
            previousMaximizedState
        };
        const actualAction = compact(previousMaximizedState, previousExpandedDimensions);
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for expand', () => {
        const expectedAction = {
            windowName: 'window0002',
            type: ACTION_TYPES.TOGGLE_COMPACT,
            isCompact: false
        };
        const actualAction = expand();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for full view', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.STATE_FULL_VIEW };
        const actualAction = fullView();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for maximize', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.MAXIMIZE };
        const actualAction = maximize();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for restore', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.RESTORE };
        const actualAction = restore();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for resizing', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.RESIZING };
        const actualAction = resizing();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action for open', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.OPEN };
        const actualAction = open();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    describe('resizeTo', () => {
        let store;
        let updateOptionsStub;
        let resizeToStub;

        beforeEach(() => {
            const mockStore = configureMockStore([thunk]);
            store = mockStore({
                childWindows: {
                    window0002: {
                        windowState: {
                            isMaximized: false,
                            previousExpandedDimensions: [1000, 1000]
                        }
                    }
                }
            });

            updateOptionsStub = sinon.stub();
            rewiredActions.__Rewire__('updateOptions', updateOptionsStub);

            resizeToStub = sinon.stub();
            rewiredActions.__Rewire__('resizeTo', resizeToStub);
        });

        afterEach(() => {
            store = null;
            rewiredActions.__ResetDependency__('updateOptions');
            rewiredActions.__ResetDependency__('resizeTo');
        });

        describe('compact', () => {

            it('should return a promise', () => {
                expect(store.dispatch(resizeToCompact())).to.be.a('promise');
            });

            it('should resolve when both updating the options and resizing succeed', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.TOGGLE_COMPACT, isCompact: true, previousMaximizedState: false }
                ];

                updateOptionsStub.callsArg(1); // call success callback
                resizeToStub.callsArg(3);      // call success callback

                return store.dispatch(resizeToCompact())
                    .then(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()[4].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when updating the options fails and resizing succeeds', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_ERROR },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.TOGGLE_COMPACT, isCompact: true, previousMaximizedState: false }
                ];

                updateOptionsStub.callsArg(2); // call error callback
                resizeToStub.callsArg(3);      // call success callback

                return store.dispatch(resizeToCompact())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()[4].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when updating the options succeeds and resizing fails', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_ERROR }
                ];

                updateOptionsStub.callsArg(1); // call success callback
                resizeToStub.callsArg(4);      // call error callback

                return store.dispatch(resizeToCompact())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when both updating the options and resizing fail', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_ERROR },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_ERROR }
                ];

                updateOptionsStub.callsArg(2); // call error callback
                resizeToStub.callsArg(4);      // call error callback

                return store.dispatch(resizeToCompact())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });
        });

        describe('previous', () => {
            it('should return a promise', () => {
                expect(store.dispatch(resizeToPrevious())).to.be.a('promise');
            });

            it('should resolve when both updating the options and resizing succeed', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.TOGGLE_COMPACT, isCompact: false }
                ];

                updateOptionsStub.callsArg(1); // call success callback
                resizeToStub.callsArg(3);      // call success callback

                return store.dispatch(resizeToPrevious())
                    .then(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()[4].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when updating the options fails and resizing succeeds', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_ERROR },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.TOGGLE_COMPACT, isCompact: false }
                ];

                updateOptionsStub.callsArg(2); // call error callback
                resizeToStub.callsArg(3);      // call success callback

                return store.dispatch(resizeToPrevious())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when updating the options succeeds and resizing fails', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_SUCCESS },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_ERROR }
                ];

                updateOptionsStub.callsArg(1); // call success callback
                resizeToStub.callsArg(4);      // call error callback

                return store.dispatch(resizeToPrevious())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it('should reject when both updating the options and resizing fail', () => {
                const expectedActions = [
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS },
                    { windowName: 'window0002', type: ACTION_TYPES.UPDATING_OPTIONS_ERROR },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZING },
                    { windowName: 'window0002', type: ACTION_TYPES.RESIZE_ERROR }
                ];

                updateOptionsStub.callsArg(2); // call error callback
                resizeToStub.callsArg(4);      // call error callback

                return store.dispatch(resizeToPrevious())
                    .catch(() => {
                        expect(store.getActions()[0].type).to.be.a('string');
                        expect(store.getActions()[1].type).to.be.a('string');
                        expect(store.getActions()[2].type).to.be.a('string');
                        expect(store.getActions()[3].type).to.be.a('string');
                        expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });
        });
    });
});

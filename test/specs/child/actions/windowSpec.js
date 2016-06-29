import { expect } from 'chai';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../src/child/actions/window';
import { WINDOW as ACTION_TYPES } from '../../../../src/child/constants/actionTypes.js';

describe('child/actions/window', () => {
    it('should create an action for minimize', () => {
        const expectedAction = { type: ACTION_TYPES.MINIMIZE };
        expect(actions.minimise()).to.deep.equal(expectedAction);
    });

    it('should create an action for compact', () => {
        const expectedAction = {
            type: ACTION_TYPES.TOGGLE_COMPACT,
            state: true
        };
        expect(actions.compact()).to.deep.equal(expectedAction);
    });

    it('should create an action for expand', () => {
        const expectedAction = {
            type: ACTION_TYPES.TOGGLE_COMPACT,
            state: false
        };
        expect(actions.expand()).to.deep.equal(expectedAction);
    });

    it('should create an action for full view', () => {
        const expectedAction = { type: ACTION_TYPES.STATE_FULL_VIEW };
        expect(actions.fullView()).to.deep.equal(expectedAction);
    });

    it('should create an action for maximize', () => {
        const expectedAction = { type: ACTION_TYPES.MAXIMIZE };
        expect(actions.maximize()).to.deep.equal(expectedAction);
    });

    it('should create an action for restore', () => {
        const expectedAction = { type: ACTION_TYPES.RESTORE };
        expect(actions.restore()).to.deep.equal(expectedAction);
    });

    it('should create an action for close', () => {
        const expectedAction = { type: ACTION_TYPES.CLOSE };
        expect(actions.close()).to.deep.equal(expectedAction);
    });

    it('should create an action for resizing', () => {
        const expectedAction = { type: ACTION_TYPES.RESIZING };
        expect(actions.resizing()).to.deep.equal(expectedAction);
    });

    describe('resize to compact', () => {
        let mockStore;
        let fin;

        const resizeTo = (width, height, anchor = 'top-left', callback, errorCallback) => {
            if (isNaN(width) || isNaN(height)) {
                return errorCallback(undefined);
            }
            return callback;
        };

        const cleanUp = () => {
            global.fin = fin;
        };

        before(() => {
            mockStore = configureMockStore([thunk]);
            global.fin = {
                desktop: {
                    Window: {
                        getCurrent: () => ({
                            resizeTo
                        })
                    }
                }
            };
        });

        after(cleanUp);

        it('should create an action for resizing', () => {
            const expectedActions = [{ type: ACTION_TYPES.RESIZING }];

            const store = mockStore();

            // TODO: update to be async?
            store.dispatch(actions.resizeToCompact());
            expect(store.getActions()).to.deep.equal(expectedActions);
        });


    });

    describe('resize to default', () => {

    });
});

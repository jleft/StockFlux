import { expect } from 'chai';
import * as actions from '../../../src/child/actions/window';

describe('window actions', () => {
    it('should create an action for minimise', () => {
        const expectedAction = { type: actions.MINIMIZE };
        expect(actions.minimise()).to.deep.equal(expectedAction);
    });

    it('should create an action for compact', () => {
        const expectedAction = {
            type: actions.TOGGLE_COMPACT,
            state: true
        };
        expect(actions.compact()).to.deep.equal(expectedAction);
    });

    it('should create an action for expand', () => {
        const expectedAction = {
            type: actions.TOGGLE_COMPACT,
            state: false
        };
        expect(actions.expand()).to.deep.equal(expectedAction);
    });

    it('should create an action for full view', () => {
        const expectedAction = { type: actions.STATE_FULL_VIEW };
        expect(actions.fullView()).to.deep.equal(expectedAction);
    });

    it('should create an action for maximize', () => {
        const expectedAction = { type: actions.MAXIMIZE };
        expect(actions.maximize()).to.deep.equal(expectedAction);
    });

    it('should create an action for restore', () => {
        const expectedAction = { type: actions.RESTORE };
        expect(actions.restore()).to.deep.equal(expectedAction);
    });

    it('should create an action for close', () => {
        const expectedAction = { type: actions.CLOSE };
        expect(actions.close()).to.deep.equal(expectedAction);
    });
});

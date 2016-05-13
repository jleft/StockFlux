import { expect } from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/child/actions/sidebar';

const mockStore = configureMockStore([thunk]);

describe('sidebar actions', () => {
    it('should create an action to input a stock to search for', () => {
        const term = 'GOOG';
        const expectedAction = {
            type: actions.SEARCH_INPUT,
            term
        };
        expect(actions.searchInput(term)).to.deep.equal(expectedAction);
    });

    it('should create an action to select a stock', () => {
        const code = 'GOOG';
        const name = 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume';
        const expectedAction = {
            code,
            name,
            type: actions.SELECTION
        };
        expect(actions.selectStock(code, name)).to.deep.equal(expectedAction);
    });

    it('should create an action to unselect a stock', () => {
        const expectedAction = { type: actions.UNSELECT };
        expect(actions.unselectStock()).to.deep.equal(expectedAction);
    });

    it('should create an action to toggle a favourite', () => {
        const code = 'GOOG';
        const expectedAction = {
            code,
            type: actions.TOGGLE_FAVOURITE
        };
        expect(actions.toggleFavourite(code)).to.deep.equal(expectedAction);
    });

    it('should create an action to clear a search', () => {
        const expectedAction = { type: actions.CLEAR_SEARCH };
        expect(actions.clearSearch()).to.deep.equal(expectedAction);
    });

    it('should create an action to finish a search', () => {
        const term = 'GOOG';
        const result1 = {
            code: 'GOOG',
            name: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume'
        };
        const result2 = {
            code: 'GOOGL',
            name: 'Alphabet Inc (GOOGL) Prices, Dividends, Splits and Trading Volume'
        };
        const results = [result1, result2];
        const expectedAction = {
            type: actions.SEARCH_FINISHED,
            term,
            results
        };
        expect(actions.searchFinished(term, results)).to.deep.equal(expectedAction);
    });

    it('should create an action to error a search', () => {
        const expectedAction = { type: actions.SEARCH_ERROR };
        expect(actions.searchError()).to.deep.equal(expectedAction);
    });

    it('should create an action to select search', () => {
        const expectedAction = { type: actions.SEARCH_CLICKED };
        expect(actions.selectSearch()).to.deep.equal(expectedAction);
    });

    it('should create an action to select favourites', () => {
        const expectedAction = { type: actions.FAV_CLICKED };
        expect(actions.selectFavourites()).to.deep.equal(expectedAction);
    });

    describe('async search', () => {
        afterEach(() => {
            nock.cleanAll();
        });
        it('Should clear the search if an empty string is input', () => {
            const expectedActions = [{ type: actions.CLEAR_SEARCH }];
            const store = mockStore({ results: [] });

            store.dispatch(actions.search(''));
            expect(store.getActions()).to.deep.equal(expectedActions);
        });

        it('Should clear the search if an string with only whitespace is input', () => {
            const expectedActions = [{ type: actions.CLEAR_SEARCH }];
            const store = mockStore({ results: [] });

            store.dispatch(actions.search('  '));
            expect(store.getActions()).to.deep.equal(expectedActions);
        });

        it('rename me', () => {
            const term = 'GOOG';
            const expectedActions = [{
                type: actions.SEARCH_STARTED,
                term
            }];
            const store = mockStore({ results: [] });

            return store.dispatch(actions.search('GOOG'))
                .then(expect(store.getActions()).to.deep.equal(expectedActions));
        });
    });
});

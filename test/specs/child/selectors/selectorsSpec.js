import { expect } from 'chai';
import {
    appSelector,
    favouritesSelector,
    searchSelector,
    sidebarSelector,
    toolbarSelector,
    __RewireAPI__ as rewiredSelectors
} from '../../../../src/child/selectors/selectors';

describe('child/selectors/selectors', () => {

    // TODO: need to mock the OpenFin stuff for window name...

    let intitialState;
    before(() => {
        const windowNameFunc = () => ({ name: 'window0002' });
        rewiredSelectors.__Rewire__('currentWindowService', { getCurrentWindow: windowNameFunc });

        intitialState = {
            window0001: {},
            window0002: {
                favourites: {
                    codes: ['AAPL', 'GOOG'],
                    names: {
                        AAPL: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                        GOOG: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume'
                    }
                },
                search: {
                    isSearching: false,
                    term: 'AAPL',
                    results: [{
                        name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                        code: 'AAPL'
                    }]
                },
                selection: {
                    code: 'AAPL',
                    name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume'
                },
                sidebar: {
                    showFavourites: true
                },
                windowState: {
                    isCompact: false,
                    isMaximised: false,
                    isResizing: false
                }
            }
        };
    });

    describe('appSelector', () => {
        it('should return the correct result', () => {
            const selectedState = {
                name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                code: 'AAPL',
                windowState: {
                    isCompact: false,
                    isMaximised: false,
                    isResizing: false
                }
            };
            expect(appSelector(intitialState)).to.deep.equal(selectedState);
        });
    });

    describe('favouritesSelector', () => {
        it('should return the correct result', () => {
            const selectedState = {
                favourites: {
                    codes: ['AAPL', 'GOOG'],
                    names: {
                        AAPL: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                        GOOG: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume'
                    }
                },
                selection: {
                    code: 'AAPL',
                    name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume'
                },
                windowState: {
                    isCompact: false,
                    isMaximised: false,
                    isResizing: false
                },
                isStarting: false,
                hasErrors: false
            };
            expect(favouritesSelector(intitialState)).to.deep.equal(selectedState);
        });
    });

    describe('searchSelector', () => {
        it('should return the correct result', () => {
            const selectedState = {
                favourites: {
                    codes: ['AAPL', 'GOOG'],
                    names: {
                        AAPL: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                        GOOG: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume'
                    }
                },
                isSearching: false,
                hasErrors: undefined, // TODO: fix?
                results: [{
                    name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                    code: 'AAPL'
                }],
                term: 'AAPL',
                selection: {
                    code: 'AAPL',
                    name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume'
                }
            };
            expect(searchSelector(intitialState)).to.deep.equal(selectedState);
        });
    });

    describe('sidebarSelector', () => {
        it('should return the correct result', () => {
            const selectedState = {
                sidebar: {
                    showFavourites: true
                },
                selection: {
                    code: 'AAPL',
                    name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume'
                },
                favourites: {
                    codes: ['AAPL', 'GOOG'],
                    names: {
                        AAPL: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
                        GOOG: 'Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume'
                    }
                },
                windowState: {
                    isCompact: false,
                    isMaximised: false,
                    isResizing: false
                }
            };
            expect(sidebarSelector(intitialState)).to.deep.equal(selectedState);
        });
    });

    describe('toolbarSelector', () => {
        it('should return the correct result', () => {
            const selectedState = {
                windowState: {
                    isCompact: false,
                    isMaximised: false,
                    isResizing: false
                }
            };
            expect(toolbarSelector(intitialState)).to.deep.equal(selectedState);
        });
    });

});

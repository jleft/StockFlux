import { selectSearch,
         selectFavourites } from '../../../../src/child/actions/sidebar';
import { SIDEBAR as ACTION_TYPES } from '../../../../src/shared/constants/actionTypes';

describe('child/actions/sidebar', () => {
    it('should create an action to select search', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.SEARCH_CLICKED };
        const actualAction = selectSearch();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });

    it('should create an action to select favourites', () => {
        const expectedAction = { windowName: 'window0002', type: ACTION_TYPES.FAV_CLICKED };
        const actualAction = selectFavourites();
        expect(actualAction.type).to.be.a('string');
        expect(actualAction).to.deep.equal(expectedAction);
    });
});

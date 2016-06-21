import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../../../../src/child/containers/App.js';

describe('child/containers/App', () => {
    let output;

    before(() => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App />);
        output = renderer.getRenderOutput();
    });

    after(() => {
    });

    it('should render correctly', () => {
        expect(output.type).to.equal('div');
    });
});

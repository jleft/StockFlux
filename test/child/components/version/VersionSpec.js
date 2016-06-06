import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Version from '../../../../src/child/components/version/Version.js';
import versionValue from '../../../../src/shared/versionValue';

function setup() {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Version />);
    const output = renderer.getRenderOutput();
    return output;
}

describe('child/components/version/Version', () => {
    it('should render correctly', () => {
        const output = setup();

        expect(output.type).to.equal('a');
        expect(output.props.className).to.equal('version');
        expect(output.props.title).to.equal('Open project on GitHub');
        expect(output.props.onClick).to.be.function;

        const [versionLabel, version] = output.props.children;
        expect(versionLabel).to.equal('GitHub ');
        expect(version).to.equal(versionValue);
    });
});

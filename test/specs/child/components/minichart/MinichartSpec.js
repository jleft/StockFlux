import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Minichart from '../../../../../src/child/components/minichart/Minichart.js';

function setup(chartData) {
    const stockCode = 'GOOG';

    const renderer = TestUtils.createRenderer();
    renderer.render(<Minichart stockCode={stockCode} chartData={chartData} />);
    const output = renderer.getRenderOutput();
    return output;
}

describe('child/components/version/Minichart', () => {
    it('should render correctly when there is no chart data', () => {
        const output = setup();

        expect(output.type).to.equal('div');
        expect(output.props.className).to.equal('minichartWrapper');

        const [chart, noDataMessage] = output.props.children;
        expect(chart.type).to.equal('svg');
        expect(chart.props.className).to.equal('minichart');
        expect(chart.props.id).to.equal('GOOGchart');

        expect(noDataMessage.type).to.equal('div');
        expect(noDataMessage.props.className).to.equal('minichart minichart-error');
        expect(noDataMessage.props.children).to.equal('Not enough data to show minichart');
    });
});

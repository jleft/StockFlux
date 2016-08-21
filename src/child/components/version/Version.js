import React from 'react';
import version from '../../../shared/versionValue';
import { openUrlWithBrowser } from '../../services/currentWindowService';

export default () => (
    <a
      className="version"
      onClick={() => openUrlWithBrowser('https://github.com/ScottLogic/StockFlux')}
      title="Open project on GitHub"
    >
        GitHub {version}
    </a>
);

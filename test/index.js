beforeEach(() => {
    window.fin = {
        desktop: {
            Window: {
                getCurrent: sinon.stub().returns({
                    name: 'window0002',
                    resizeTo: sinon.stub(),
                    updateOptions: sinon.stub()
                })
            },
            System: {
                openUrlWithBrowser: sinon.stub()
            },
            main: sinon.stub()
        }
    };
});

afterEach(() => {
    delete window.fin;
});

const context = require.context('./specs', true, /^\.\/.*Spec\.js$/);
context.keys().forEach(context);

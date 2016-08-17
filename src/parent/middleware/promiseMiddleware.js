import promiseMiddleware from 'redux-promise-middleware';

export default promiseMiddleware({ promiseTypeSuffixes: ['', 'SUCCESS', 'ERROR'] });

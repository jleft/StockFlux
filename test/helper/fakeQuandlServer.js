import fetchMock from 'fetch-mock';

import quandlSearchResponse from '../fixture/quandlSearchResponse.json';
import googMetadataResponse from '../fixture/quandlMetadataResponse.json';
import googStockdataResponse from '../fixture/quandlStockDataResponse.json';
import quandlBadResponse from '../fixture/quandlErrorResponse.json';

const baseUrl = 'https://www.quandl.com/api/v3/datasets';
const headers = { 'Content-Type': 'application/json' };

function successResponse(body) {
    return {
        body,
        headers,
        status: 200
    };
}

const errorResponse = {
    body: quandlBadResponse,
    headers,
    status: 404
};

module.exports = (apiKey = '') => {
    const apiKeyParam = apiKey !== '' ? `api_key=${apiKey}` : '';

    // Search
    fetchMock
        .mock(`https://www.quandl.com/api/v3/datasets.json?${apiKeyParam}&query=GOOG&database_code=WIKI`, successResponse(quandlSearchResponse))
        .mock(`${baseUrl}.json?&query=GOOG&database_code=WIKI`, successResponse(quandlSearchResponse))
        .mock(`${baseUrl}.json?${apiKeyParam}&query=BAD&database_code=WIKI`, errorResponse)
        .mock(`${baseUrl}.json?&query=BAD&database_code=WIKI`, errorResponse);


    // metadata
    fetchMock
        .mock(`${baseUrl}/WIKI/GOOG/metadata.json?${apiKeyParam}`, successResponse(googMetadataResponse))
        .mock(`${baseUrl}/WIKI/BAD/metadata.json?${apiKeyParam}`, errorResponse);

    // stock data
    fetchMock
        .mock(`${baseUrl}/WIKI/GOOG.json?${apiKeyParam}&start_date=2016-05-04`, successResponse(googStockdataResponse))
        .mock(`${baseUrl}/WIKI/GOOG.json?&start_date=2016-05-04`, successResponse(googStockdataResponse))
        .mock(`${baseUrl}/WIKI/BAD.json?&start_date=2016-05-04`, errorResponse)
        .mock(`${baseUrl}/WIKI/BAD.json?${apiKeyParam}&start_date=2016-05-04`, errorResponse);

    return fetchMock;
};

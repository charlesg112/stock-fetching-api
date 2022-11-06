import express, { NextFunction, Request, Response } from 'express';
import { Stock } from '../../src/stocks/stock';
import { StockApi } from '../../src/api/stocks-api';
import { StockBuilder } from '../helpers/stock-builder';
import { StockService } from '../../src/service/stock-service';
import { StockNotFoundError } from '../../src/persistence/stock-not-found-error';
import { ExpressRequestBuilder } from '../helpers/express-request-builder';
import { ExpressResponseBuilder } from '../helpers/express-response-builder';

describe('Stock api tests', () => {
    const STOCK_ID = '12345';

    let REQUEST: Request;
    const RESPONSE = new ExpressResponseBuilder().build();

    const NEXT_FUNCTION = jest.fn();

    const stock: Stock = new StockBuilder().withId(STOCK_ID).build();

    const getStockByIdMock = jest.fn(async (_) => stock);
    const getWatchedStocksMock = jest.fn(async () => [stock]);
    const getStockUpdatesMock = jest.fn(async () => []);

    let stockServiceMock: StockService;

    const updateAssemblerMock = {
        toDto: jest.fn()
    };

    let stockApi: StockApi;

    beforeEach(() => {
        REQUEST = new ExpressRequestBuilder().withParam({ id: STOCK_ID }).build();

        jest.resetAllMocks();

        stockServiceMock = {
            getStock: getStockByIdMock,
            getWatchedStocks: getWatchedStocksMock,
            getStockUpdates: getStockUpdatesMock
        };

        stockApi = new StockApi(stockServiceMock, updateAssemblerMock);
    });

    test('When retrieving watched stocks Then watched stocks are fetched from repository', async () => {
        await stockApi.getWatchedStocks(REQUEST, RESPONSE, NEXT_FUNCTION);

        expect(getWatchedStocksMock).toHaveBeenCalled();
    });

    test('Given persisted stock id When retrieving stock by id Then stock is fetched from repository', async () => {
        await stockApi.getStockById(REQUEST, RESPONSE, NEXT_FUNCTION);

        expect(getStockByIdMock).toHaveBeenCalled();
    });

    test('Given non persisted stock id When retrieving stock by id Then error is passed to next function', async () => {
        stockServiceMock.getStock = jest.fn().mockRejectedValue(new StockNotFoundError(STOCK_ID));

        await stockApi.getStockById(REQUEST, RESPONSE, NEXT_FUNCTION);

        expect(NEXT_FUNCTION).toHaveBeenCalled();
    });

    test('When retrieving stock updates Then updates are fetched from repository', async () => {
        await stockApi.getStockUpdates(REQUEST, RESPONSE, NEXT_FUNCTION);

        expect(getStockUpdatesMock).toHaveBeenCalled();
    });

    test('Given non persisted stock When retrieving stock updated Then error is passed to next function', async () => {
        stockServiceMock.getStockUpdates = jest.fn().mockRejectedValue(new StockNotFoundError(STOCK_ID));

        await stockApi.getStockUpdates(REQUEST, RESPONSE, NEXT_FUNCTION);

        expect(NEXT_FUNCTION).toHaveBeenCalled();
    });
});

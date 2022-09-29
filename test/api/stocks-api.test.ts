import {Stock} from "../../src/stocks/stock";
import {StockApi} from "../../src/api/stocks-api";
import {StockBuilder} from "../helpers/stock-builder";
import {StockService} from "../../src/domain/stock-service";

describe("Stock api tests", () => {

    const stock: Stock = new StockBuilder().build();

    const getStockByIdMock = jest.fn(async (_) => stock)
    const getWatchedStocksMock = jest.fn(async () => [stock])
    const getStockClosesMock = jest.fn(async () => [])

    const stockServiceMock: StockService = {
        getStock: getStockByIdMock,
        getWatchedStocks: getWatchedStocksMock,
        getStockUpdates: getStockClosesMock
    }

    const stockApi = new StockApi(stockServiceMock);

    test("Given non persisted stock id When retrieving stock Then error is returned", async () => {

    })
})

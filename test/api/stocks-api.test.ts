import {Stock} from "../../src/stocks/stock";
import {StockApi} from "../../src/api/stocks-api";
import {StockBuilder} from "../helpers/stock-builder";
import {StockService} from "../../src/domain/stock-service";

describe("Stock api tests", () => {

    const stock: Stock = new StockBuilder().build();

    const getStockByIdMock = jest.fn(async (_) => stock)
    const getWatchedStocksMock = jest.fn(async () => [stock])

    const stockServiceMock: StockService = {
        getStockById: getStockByIdMock,
        getWatchedStocks: getWatchedStocksMock
    }

    const stockApi = new StockApi(stockServiceMock);
})
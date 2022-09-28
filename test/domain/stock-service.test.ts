import {StockService} from "../../src/domain/stock-service";
import {Stock} from "../../src/stocks/stock";

describe("Stock service tests", () => {

    const stock = new Stock("1", "AC.TO", "TSX", "CAD",
        null , null, null);
    const getStockByIdMock = jest.fn(async (id) => stock)
    const findAllMock = jest.fn(async () => [stock]);
    const repository = {
        getStockById: getStockByIdMock,
        findAll: findAllMock
    }

    const stockService = new StockService(repository);

    test("Given saved stocks When finding stocks Then stocks are retrieved", async () => {

    })
})

import {StockServiceImpl} from "../../src/domain/stock-service-impl";
import {Stock} from "../../src/stocks/stock";
import {InMemoryStockRepository} from "../../src/persistence/memory/in-memory-stock-repository";

describe("Stock service tests", () => {

    const stock = new Stock("1", "AC.TO", "TSX", "CAD",
        null , null, null);

    const inMemoryRepository = new InMemoryStockRepository();

    const stockService = new StockServiceImpl(inMemoryRepository);

    afterEach(() => {
        inMemoryRepository.clear();
    })

    test("Given saved stocks When finding stocks Then stocks are retrieved", async () => {
        inMemoryRepository.save(stock);

        const stocks = await stockService.getWatchedStocks();

        expect(stocks.length).toBe(1);
        expect(stocks[0].id).toBe(stock.id);
    })

    test("Given saved stock id When finding stocks by id Then stock is retrieved", async () => {
        inMemoryRepository.save(stock);

        const savedStock = await stockService.getStockById(stock.id);

        expect(savedStock).not.toBeNull();
    })

    test("Given not saved stock id When finding stocks by id Then exception is thrown", async () => {
        const notSaveStockId = "abc";

        await expect(stockService.getStockById(notSaveStockId)).rejects.toThrow();
    })
})

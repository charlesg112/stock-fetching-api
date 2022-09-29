import {StockServiceImpl} from "../../src/domain/stock-service-impl";
import {Stock} from "../../src/stocks/stock";
import {InMemoryStockRepository} from "../../src/persistence/memory/in-memory-stock-repository";
import {StockUpdateBuilder} from "../helpers/stock-update-builder";

describe("Stock service tests", () => {

    const stockId = "1";
    const stock = new Stock(stockId, "AC.TO", "TSX", "CAD",
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

        const savedStock = await stockService.getStock(stockId);

        expect(savedStock).not.toBeNull();
    })

    test("Given not saved stock id When finding stocks by id Then exception is thrown", async () => {
        const notSaveStockId = "abc";

        await expect(stockService.getStock(notSaveStockId)).rejects.toThrow();
    })

    test("Given saved stock id When finding stocks updates by id Then updates are retrieved", async () => {
        inMemoryRepository.saveUpdate(new StockUpdateBuilder().withId(stockId).build());

        const savedUpdate = await stockService.getStockUpdates(stockId);

        expect(savedUpdate).not.toBeNull();
    })

    test("Given non saved stock id When finding stocks updates by id Then exception is thrown", async () => {
        const notSaveStockId = "abc";

        await expect(stockService.getStockUpdates(notSaveStockId)).rejects.toThrow();
    })
})

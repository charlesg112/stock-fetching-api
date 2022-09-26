import {InMemoryStockRepository} from "../../../src/persistence/memory/in-memory-stock-repository";
import {Stock} from "../../../src/stocks/stock";

describe("Memory Stock Repository", () => {
    const stocks = [createStock(), createStock(), createStock()];

    const repository = new InMemoryStockRepository();

    afterEach(() => {
        repository.clear();
    })

    test("Given saved stocks When finding all stocks Then all stocks are returned", async () => {
        stocks.forEach(s => repository.save(s));

        const savedStocks = await repository.findAll();

        expect(savedStocks.length).toBe(stocks.length);
        stocks.forEach(s => {
            const match = savedStocks.find(saved => saved.id == s.id);
            expect(match).not.toBeNull();
        })
    })

    test("Given non saved stock When finding stock by id Then error is throw", async () => {
        const nonExistentStockId = "abc";

        await expect(repository.getStockById(nonExistentStockId)).rejects.toThrow();
    })

    test("Given non saved stock When finding stock by id Then error is throw", async () => {
        const nonExistentStockId = "abc";

        await expect(repository.getStockById(nonExistentStockId)).rejects.toThrow();
    })

    test("Given save stock When finding stock by id Then stock is returned", async () => {
        const stockToSave = createStock();
        repository.save(stockToSave);

        const savedStock = await repository.getStockById(stockToSave.id);

        expect(savedStock).toEqual(stockToSave);
    })

    function createStock(): Stock {
        return new Stock(getRandomString(), getRandomString(), getRandomString(),
            getRandomString(), null, null, null);
    }

    function getRandomString(): string {
        return Math.random().toString().slice(0, 20);
    }
})

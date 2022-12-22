import { InMemoryStockRepository } from '../../../src/persistence/memory/in-memory-stock-repository';
import { Stock } from '../../../src/stocks/stock';
import { StockUpdateBuilder } from '../../helpers/stock-update-builder';

describe('Memory Stock Repository', () => {
    const stocks = [createStock(), createStock(), createStock()];

    const repository = new InMemoryStockRepository();

    afterEach(() => {
        repository.clear();
    });

    test('Given saved stocks When finding all stocks Then all stocks are returned', async () => {
        stocks.forEach((s) => repository.save(s));

        const savedStocks = await repository.findAll();

        expect(savedStocks.length).toBe(stocks.length);
        stocks.forEach((s) => {
            const match = savedStocks.find((saved) => saved.id == s.id);
            expect(match).not.toBeNull();
        });
    });

    test('Given non saved stock When finding stock by id Then error is throw', async () => {
        const nonExistentStockId = 'abc';

        await expect(repository.getStockById(nonExistentStockId)).rejects.toThrow();
    });

    test('Given saved stock When finding stock by id Then stock is returned', async () => {
        const stockToSave = createStock();
        repository.save(stockToSave);

        const savedStock = await repository.getStockById(stockToSave.id);

        expect(savedStock).toEqual(stockToSave);
    });

    test('Given saved stock updates When finding stock updates by id Then stock updates are returned', async () => {
        const stockId = '123';
        const firstStockUpdate = new StockUpdateBuilder().withId(stockId).build();
        const secondStockUpdate = new StockUpdateBuilder().withId(stockId).build();
        repository.saveUpdate(firstStockUpdate);
        repository.saveUpdate(secondStockUpdate);

        const savedUpdates = await repository.getStockUpdatesById(stockId);

        expect(savedUpdates).toHaveLength(2);
        expect(savedUpdates).toContain(firstStockUpdate);
        expect(savedUpdates).toContain(secondStockUpdate);
    });

    test('Given non saved stock When finding stock updates by id Then error is thrown', async () => {
        const nonSavedStockId = 'abc';

        await expect(repository.getStockUpdatesById(nonSavedStockId)).rejects.toThrow();
    });

    function createStock(): Stock {
        return new Stock(getRandomString(), getRandomString(), getRandomString(), getRandomString(), null, null, null, null);
    }

    function getRandomString(): string {
        return Math.random().toString().slice(0, 20);
    }
});

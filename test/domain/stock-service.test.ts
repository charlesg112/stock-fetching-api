import { StockServiceImpl } from '../../src/service/stock-service-impl';
import { Stock } from '../../src/stocks/stock';
import { InMemoryStockRepository } from '../../src/persistence/memory/in-memory-stock-repository';
import { StockUpdateBuilder } from '../helpers/stock-update-builder';
import { StockUpdateDtoBuilder } from '../helpers/stock-update-dto-builder';

describe('Stock service tests', () => {
    const stockId = '1';
    const stock = new Stock(stockId, 'AC.TO', 'TSX', 'CAD', null, null, null, null);

    const inMemoryRepository = new InMemoryStockRepository();

    const stockService = new StockServiceImpl(inMemoryRepository);

    afterEach(() => {
        inMemoryRepository.clear();
    });

    test('Given saved stocks When finding stocks Then stocks are retrieved', async () => {
        inMemoryRepository.save(stock);

        const stocks = await stockService.getWatchedStocks();

        expect(stocks.length).toBe(1);
        expect(stocks[0].id).toBe(stock.id);
    });

    test('Given saved stock id When finding stocks by id Then stock is retrieved', async () => {
        inMemoryRepository.save(stock);

        const savedStock = await stockService.getStock(stockId);

        expect(savedStock).not.toBeNull();
    });

    test('Given not saved stock id When finding stocks by id Then exception is thrown', async () => {
        const notSaveStockId = 'abc';

        await expect(stockService.getStock(notSaveStockId)).rejects.toThrow();
    });

    test('Given saved stock id When finding stocks updates by id Then updates are retrieved', async () => {
        const stockUpdateDto = new StockUpdateDtoBuilder().withId(stockId).build();
        inMemoryRepository.saveUpdate(new StockUpdateBuilder().withId(stockId).build());

        const savedUpdate = await stockService.getStockUpdates(stockUpdateDto);

        expect(savedUpdate).not.toBeNull();
    });

    test('Given non saved stock id When finding stocks updates by id Then exception is thrown', async () => {
        const notSaveStockId = 'abc';
        const stockUpdateDto = new StockUpdateDtoBuilder().withId(notSaveStockId).build();

        await expect(stockService.getStockUpdates(stockUpdateDto)).rejects.toThrow();
    });
});

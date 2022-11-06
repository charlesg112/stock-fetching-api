import { StockRepository } from '../../domain/stock-repository';
import { Stock, StockUpdate } from '../../stocks/stock';
import { NonexistentStockError } from '../../domain/nonexistent-stock-error';

export class InMemoryStockRepository implements StockRepository {
    private stocks;
    private stockUpdates;

    constructor() {
        this.stocks = new Map<string, Stock>();
        this.stockUpdates = new Map<string, StockUpdate[]>();
    }

    save(stock: Stock) {
        this.stocks.set(stock.id, stock);
    }

    saveUpdate(update: StockUpdate) {
        let currentUpdates = this.stockUpdates.get(update.id);
        if (!currentUpdates) {
            currentUpdates = [];
        }
        currentUpdates.push(update);
        this.stockUpdates.set(update.id, currentUpdates);
    }

    clear() {
        this.stocks.clear();
    }

    findAll(): Promise<Stock[]> {
        return Promise.resolve(Array.from(this.stocks.values()));
    }

    getStockById(id: string): Promise<Stock> {
        const stock = this.stocks.get(id);

        if (stock == null) {
            return Promise.reject(new NonexistentStockError(id));
        }

        return Promise.resolve(stock);
    }

    getStockUpdatesById(id: string): Promise<StockUpdate[]> {
        const updates = this.stockUpdates.get(id);

        if (updates == null) {
            return Promise.reject(new NonexistentStockError(id));
        }

        return Promise.resolve(updates);
    }
}

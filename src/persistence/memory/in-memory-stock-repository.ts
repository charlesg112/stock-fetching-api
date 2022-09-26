import {StockRepository} from "../stock-repository";
import {Stock} from "../../stocks/stock";
import {NonexistentStockError} from "../nonexistent-stock-error";

export class InMemoryStockRepository implements StockRepository {

    private stocks;

    constructor() {
        this.stocks = new Map<string, Stock>;
    }

    save(stock: Stock) {
        this.stocks.set(stock.id, stock);
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
}

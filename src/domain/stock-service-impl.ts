import {StockRepository} from "./stock-repository";
import {Stock, StockUpdate} from "../stocks/stock";
import {NonexistentStockError} from "./nonexistent-stock-error";
import {StockService} from "./stock-service";

export class StockServiceImpl implements StockService{
    private repository: StockRepository;

    constructor(repository: StockRepository) {
        this.repository = repository;
    }

    getStock(id: string): Promise<Stock> {
        try {
            return this.repository.getStockById(id);
        }
        catch (e) {
            throw new NonexistentStockError(id);
        }
    }

    getWatchedStocks(): Promise<Stock[]> {
        return this.repository.findAll();
    }

    getStockUpdates(id: string): Promise<StockUpdate[]> {
        try {
            return this.repository.getStockUpdatesById(id);
        }
        catch (e) {
            throw new NonexistentStockError(id);
        }
    }
}

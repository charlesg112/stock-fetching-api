import {StockRepository} from "./stock-repository";
import {Stock} from "../stocks/stock";
import {NonexistentStockError} from "./nonexistent-stock-error";
import {StockService} from "./stock-service";

export class StockServiceImpl implements StockService{
    private repository: StockRepository;

    constructor(repository: StockRepository) {
        this.repository = repository;
    }

    getStockById(id: string): Promise<Stock> {
        try {
            return this.repository.getStockById(id);
        }
        catch (e) {
            throw new NonexistentStockError(`Could not find stock with id ${id}`);
        }
    }

    getWatchedStocks(): Promise<Stock[]> {
        return this.repository.findAll();
    }
}

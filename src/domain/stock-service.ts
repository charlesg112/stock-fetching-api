import {StockRepository} from "../persistence/stock-repository";
import {Stock} from "../stocks/stock";

export class StockService {
    private repository: StockRepository;

    constructor(repository: StockRepository) {
        this.repository = repository;
    }

    getStockById(id: string): Promise<Stock> {
        return this.repository.getStockById(id);
    }

    getWatchedStocks(): Promise<Stock[]> {
        return this.repository.findAll();
    }
}

import { StockRepository } from '../domain/stock-repository';
import { Stock, StockUpdate } from '../stocks/stock';
import { NonexistentStockError } from '../domain/nonexistent-stock-error';
import { StockService } from './stock-service';
import { StockUpdateDto } from './stock-update-dto';

export class StockServiceImpl implements StockService {
    private repository: StockRepository;

    constructor(repository: StockRepository) {
        this.repository = repository;
    }

    getStock(id: string): Promise<Stock> {
        try {
            return this.repository.getStockById(id);
        } catch (e) {
            throw new NonexistentStockError(id);
        }
    }

    getWatchedStocks(): Promise<Stock[]> {
        return this.repository.findAll();
    }

    getStockUpdates(stockUpdateDto: StockUpdateDto): Promise<StockUpdate[]> {
        try {
            return this.repository.getStockUpdatesById(stockUpdateDto.id, stockUpdateDto.limit);
        } catch (e) {
            throw new NonexistentStockError(stockUpdateDto.id);
        }
    }
}

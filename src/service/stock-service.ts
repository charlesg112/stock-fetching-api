import { Stock, StockUpdate } from '../stocks/stock';
import { StockUpdateDto } from './stock-update-dto';

export interface StockService {
    getStock: (id: string) => Promise<Stock>;
    getWatchedStocks: () => Promise<Stock[]>;
    getStockUpdates: (stockUpdateDto: StockUpdateDto) => Promise<StockUpdate[]>;
}

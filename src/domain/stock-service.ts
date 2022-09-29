import {Stock, StockUpdate} from "../stocks/stock";

export interface StockService {
    getStock: (id: string) => Promise<Stock>;
    getWatchedStocks: () => Promise<Stock[]>;
    getStockUpdates: (id: string) => Promise<StockUpdate[]>
}

import {Stock} from "../stocks/stock";

export interface StockService {
    getStockById: (id: string) => Promise<Stock>;
    getWatchedStocks: () => Promise<Stock[]>;
}
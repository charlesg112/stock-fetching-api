import {Stock, StockUpdate} from "../stocks/stock";

export interface StockRepository {
    getStockById: (id: string) => Promise<Stock>;
    findAll: () => Promise<Stock[]>;
    getStockUpdatesById: (id: string, limit: number | null) => Promise<StockUpdate[]>;
}

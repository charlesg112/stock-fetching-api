import {Stock} from "../stocks/stock";

export interface StockRepository {
    getStockById: (id: string) => Promise<Stock>;
}

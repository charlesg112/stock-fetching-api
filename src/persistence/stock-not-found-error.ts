export class StockNotFoundError extends Error {
    stockId: string;

    constructor(stockId: string) {
        super(stockId);
        this.stockId = stockId;
    }
}

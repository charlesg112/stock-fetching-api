import {Stock} from "../../src/stocks/stock";

export class StockBuilder {
    private stock: Stock;

    constructor() {
        this.stock = new Stock(
            "1234", "AC.TO", "TSX", "CAD", new Date(), new Date(), 10
        )
    }

    public build() {
        return this.stock;
    }
}
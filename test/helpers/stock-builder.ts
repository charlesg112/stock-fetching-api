import { Stock } from '../../src/stocks/stock';

export class StockBuilder {
    private id: string;
    private symbol: string;
    private exchange: string;
    private currency: string;
    private lastUpdate: Date | null;
    private nextUpdate: Date | null;
    private lastValue: number | null;
    private state: string | null;

    constructor() {
        this.id = '123';
        this.symbol = 'AC.TO';
        this.exchange = 'TSX';
        this.currency = 'CAD';
        this.lastUpdate = new Date();
        this.nextUpdate = new Date();
        this.lastValue = 10.0;
        this.state = "open";
    }

    public withId(id: string): StockBuilder {
        this.id = id;
        return this;
    }

    public build() {
        return new Stock(
            this.id,
            this.symbol,
            this.exchange,
            this.currency,
            this.lastUpdate,
            this.nextUpdate,
            this.lastValue,
            this.state
        );
    }
}

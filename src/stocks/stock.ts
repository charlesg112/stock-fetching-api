export type StockUpdate = {
    id: string,
    updatedOn: Date,
    value: number
}

export class Stock {
    id: string
    symbol: string
    exchange: string
    currency: string
    lastUpdate: Date | null
    nextUpdate: Date | null
    lastValue: number | null

    constructor(id: string, symbol: string, exchange: string, currency: string,
                lastUpdate: Date | null, nextUpdate: Date | null, lastValue: number | null) {
        this.id = id;
        this.symbol = symbol;
        this.exchange = exchange;
        this.currency = currency;
        this.lastUpdate = lastUpdate;
        this.nextUpdate = nextUpdate;
        this.lastValue = lastValue;
    }
}

import { Stock } from '../../stocks/stock';

export class MongoStockAssembler {
    constructor() {}

    assemble(model: Stock): Stock {
        return new Stock(
            model.id,
            model.symbol,
            model.exchange,
            model.currency,
            model.lastUpdate,
            model.nextUpdate,
            model.lastValue
        );
    }
}

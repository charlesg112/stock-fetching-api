import {StockUpdate} from "../../src/stocks/stock";
import {randomUUID} from "crypto";

export class StockUpdateBuilder {
    private readonly stockUpdate: StockUpdate;

    constructor() {
        this.stockUpdate = {
            id: randomUUID(),
            updatedOn: new Date(),
            value: Math.random()
        }
    }

    build() {
        return this.stockUpdate;
    }

    withId(id: string): StockUpdateBuilder  {
        this.stockUpdate.id = id;
        return this;
    }
}

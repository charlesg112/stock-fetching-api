import {connect, Model, model} from "mongoose";
import {Stock, StockUpdate} from "../../stocks/stock";
import {StockRepository} from "../../domain/stock-repository";
import {stockUpdateSchema, watchedStockSchema} from "./mongo-stock-models";
import {MongoStockAssembler} from "./mongo-stock-assembler";

export class MongoStockRepository implements StockRepository {
    isConnected: boolean;
    stockUpdateModel: Model<any>;
    watchedStockModel: Model<any>;
    mongoStockAssembler: MongoStockAssembler;
    databaseUrl: string;

    constructor(databaseName: string, stockUpdatesCollectionName: string, watchedStocksCollectionName: string, databaseUrl: string | undefined) {
        this.isConnected = false;
        this.databaseUrl = MongoStockRepository.getConnectionUrl(databaseUrl, databaseName);
        this.stockUpdateModel = model(stockUpdatesCollectionName, stockUpdateSchema);
        this.watchedStockModel = model(watchedStocksCollectionName, watchedStockSchema);
        this.mongoStockAssembler = new MongoStockAssembler();
    }

    async getStockById(id: string): Promise<Stock> {
        if (!this.isConnected) {
            await this.connectToMongo();
        }

        const model = await this.watchedStockModel.findOne({id: id}) as Stock;

        return this.mongoStockAssembler.assemble(model);
    }

    async findAll(): Promise<Stock[]> {
        if (!this.isConnected) {
            await this.connectToMongo();
        }

        const models = await this.watchedStockModel.find({}) as Stock[];

        return models.map(m => this.mongoStockAssembler.assemble(m));
    }

    async getStockUpdatesById(id: string): Promise<StockUpdate[]> {
        if (!this.isConnected) {
            await this.connectToMongo();
        }

        return await this.stockUpdateModel.find({id: id}) as StockUpdate[];
    }

    private static getConnectionUrl(connectionUrl: string | undefined, databaseName: string): string {
        return connectionUrl ? connectionUrl : `mongodb://localhost/${databaseName}`;
    }

    private async connectToMongo() {
        await connect(this.databaseUrl);
        this.isConnected = true;
    }
}

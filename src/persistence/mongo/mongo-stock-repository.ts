import {connect, Model, model} from "mongoose";
import {Stock, StockUpdate} from "../../stocks/stock";
import {StockRepository} from "../../domain/stock-repository";
import {stockUpdateSchema, watchedStockSchema} from "./mongo-stock-models";
import {MongoStockAssembler} from "./mongo-stock-assembler";

export class MongoStockRepository implements StockRepository {
    static WATCHED_STOCKS_COLLECTION_NAME = 'watchedstocks';
    static STOCK_UPDATES_COLLECTION_NAME = 'stockupdates';
    static STOCK_CLOSES_COLLECTION_NAME = 'stockcloses';
    static STOCK_OPENS_COLLECTION_NAME = 'stockopens';

    isConnected: boolean;
    stockUpdateModel: Model<any>;
    watchedStockModel: Model<any>;
    mongoStockAssembler: MongoStockAssembler;
    databaseUrl: string;

    constructor(databaseName: string, databaseUrl: string | undefined) {
        this.isConnected = false;
        this.databaseUrl = MongoStockRepository.getConnectionUrl(databaseUrl, databaseName);
        this.stockUpdateModel = model(MongoStockRepository.STOCK_UPDATES_COLLECTION_NAME, stockUpdateSchema);
        this.watchedStockModel = model(MongoStockRepository.WATCHED_STOCKS_COLLECTION_NAME, watchedStockSchema);
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

    async getStockUpdatesById(id: string, limit: number): Promise<StockUpdate[]> {
        if (!this.isConnected) {
            await this.connectToMongo();
        }

        return await this.stockUpdateModel.find({id: id}).sort({'updatedOn': -1}).limit(limit) as StockUpdate[];
    }

    private static getConnectionUrl(connectionUrl: string | undefined, databaseName: string): string {
        return connectionUrl ? connectionUrl : `mongodb://localhost/${databaseName}`;
    }

    private async connectToMongo() {
        await connect(this.databaseUrl);
        this.isConnected = true;
    }
}

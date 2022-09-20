import express from "express";
import {MongoStockRepository} from "./persistence/mongo/mongo-stock-repository";
import {StockRepository} from "./persistence/stock-repository";
import {StockService} from "./domain/stock-service";
import {StockApi} from "./api/stocks-api";
const app = express()
const port = 3000

const stockApi = createStockApi();

app.use(stockApi.getRouter());

app.listen(port, () => {
    console.log(`STOCK-FETCHING-API running on ${port}`)
})

function createStockApi(): StockApi {
    const persistence: StockRepository = new MongoStockRepository("stocks",
        "stockUpdates",
        "watchedStocks",
        process.env.DATABASEURL);

    const stockService = new StockService(persistence);

    return new StockApi(stockService);
}

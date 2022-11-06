import express from "express";
import {MongoStockRepository} from "./persistence/mongo/mongo-stock-repository";
import {StockRepository} from "./domain/stock-repository";
import {StockServiceImpl} from "./service/stock-service-impl";
import {StockApi} from "./api/stocks-api";
import {StockUpdateAssemblerImpl} from "./api/stock-update-assembler-impl";
import {valueIsNotANumberMapper} from "./api/exceptions/value-is-not-a-number-mapper";
import {catchallExceptionMapper} from "./api/exceptions/catchall-exception-mapper";
const app = express()
const port = 3000

const stockApi = createStockApi();

app.use(stockApi.getRouter());

app.use(valueIsNotANumberMapper);

app.use(catchallExceptionMapper);

app.listen(port, () => {
    console.log(`STOCK-FETCHING-API running on ${port}`)
})

function createStockApi(): StockApi {
    const persistence: StockRepository = new MongoStockRepository("stocks", process.env.DATABASEURL);

    const stockUpdateAssembler = new StockUpdateAssemblerImpl();
    const stockService = new StockServiceImpl(persistence);

    return new StockApi(stockService, stockUpdateAssembler);
}

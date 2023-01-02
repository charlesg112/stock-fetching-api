import express from 'express';
import { MongoStockRepository } from './persistence/mongo/mongo-stock-repository';
import { StockRepository } from './domain/stock-repository';
import { StockServiceImpl } from './service/stock-service-impl';
import { StockApi } from './api/stocks-api';
import { StockUpdateAssemblerImpl } from './api/stock-update-assembler-impl';
import { valueIsNotANumberMapper } from './api/exceptions/value-is-not-a-number-mapper';
import { catchallExceptionMapper } from './api/exceptions/catchall-exception-mapper';
import { stockNotFoundMapper } from './api/exceptions/stock-not-found-mapper';
import { StockUpdateWebsocket } from './api/websockets/stock-update-websocket';
import * as http from 'http';
import { Server } from 'http';
import { WebsocketDirectory } from './api/websockets/websocket-directory';
import { EventParser } from './api/websockets/events/event-parser';
import { WebsocketClientEventAssembler } from './api/websockets/events/client-events/websocket-client-event-assembler';
import { WebsocketWorkerEventAssembler } from './api/websockets/events/worker-events/websocket-worker-event-assembler';

const app = express();
const server = http.createServer(app);
const port = 3000;

const stockApi = createStockApi();

app.use(stockApi.getRouter());

app.use(valueIsNotANumberMapper);
app.use(stockNotFoundMapper);
app.use(catchallExceptionMapper);

app.listen(port, () => {
    console.log(`STOCK-FETCHING-API running on ${port}`);
});

server.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${3001} :)`);
});

const stockUpdateWebsocket = createStockUpdateWebsocket(server);

function createStockApi(): StockApi {
    const persistence: StockRepository = new MongoStockRepository('stocks', process.env.DATABASEURL);

    const stockUpdateAssembler = new StockUpdateAssemblerImpl();
    const stockService = new StockServiceImpl(persistence);

    return new StockApi(stockService, stockUpdateAssembler);
}

function createStockUpdateWebsocket(server: Server): StockUpdateWebsocket {
    const websocketDirectory = new WebsocketDirectory();
    const eventParser = new EventParser();
    const websocketClientEventAssembler = new WebsocketClientEventAssembler(websocketDirectory, eventParser);
    const websocketWorkerEventAssembler = new WebsocketWorkerEventAssembler(websocketDirectory, eventParser);
    const stockFetchingWorkerAddress = process.env.ADDRESS || 'ws:localhost:54321';
    return new StockUpdateWebsocket(server, websocketDirectory, websocketClientEventAssembler, websocketWorkerEventAssembler, stockFetchingWorkerAddress);
}

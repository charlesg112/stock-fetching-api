import { WebsocketEvent } from '../websocket-event';
import WebSocket from 'ws';
import { Stock } from '../../../../stocks/stock';
import { WebsocketDirectory } from '../../websocket-directory';

export class StockUpdateEvent implements WebsocketEvent {
    private readonly stock: Stock;
    private readonly websocketDirectory: WebsocketDirectory;

    constructor(stock: Stock, websocketDirectory: WebsocketDirectory) {
        this.stock = stock;
        this.websocketDirectory = websocketDirectory;
    }

    handle(source: WebSocket): void {
        this.websocketDirectory.notifyStockUpdate(this.stock);
    }
}

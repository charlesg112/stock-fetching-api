import { WebsocketEvent } from '../websocket-event';
import WebSocket from 'ws';
import { WebsocketDirectory } from '../../websocket-directory';

export class StockSubscribeEvent implements WebsocketEvent {
    private readonly stockIds: string[];
    private websocketDirectory: WebsocketDirectory;

    constructor(stockIds: string[], websocketDirectory: WebsocketDirectory) {
        this.stockIds = stockIds;
        this.websocketDirectory = websocketDirectory;
    }

    handle(source: WebSocket): void {
        this.stockIds.forEach((s) => this.websocketDirectory.addSubscription(source, s));
    }
}

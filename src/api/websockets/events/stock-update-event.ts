import { WebsocketEvent } from './websocket-event';
import WebSocket from 'ws';

export class StockUpdateEvent implements WebsocketEvent {

    constructor() {
    }

    handle(source: WebSocket): void {
    }

}

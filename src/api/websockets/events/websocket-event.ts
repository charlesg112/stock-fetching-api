import WebSocket from 'ws/index';

export interface WebsocketEvent {
    handle(source: WebSocket): void;
}

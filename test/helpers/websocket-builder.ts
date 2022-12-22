import WebSocket from 'ws';

export class WebsocketBuilder {

    private send: any;

    constructor() {

    }

    public withSend() {

    }

    public build() {
        return {
            send: this.send
        } as unknown as WebSocket
    }
}

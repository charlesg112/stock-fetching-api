import WebSocket from 'ws';

export class WebsocketBuilder {

    private send: any;

    constructor() {
        this.send = () => {};
    }

    public withSend(sendFunction: () => void): WebsocketBuilder {
        this.send = sendFunction;
        return this;
    }

    public build() {
        return {
            send: this.send
        } as unknown as WebSocket
    }
}

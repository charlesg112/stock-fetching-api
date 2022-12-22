import { WebsocketDirectory } from '../../../src/api/websockets/websocket-directory';

describe("WebSocket Directory Tests", () => {

    const STOCK_ID = "1";
    const websocket = null;
    const websocketDirectory = new WebsocketDirectory();

    test("When adding subscription Then websocket is subscribed", () => {
        websocketDirectory.addSubscription()
    })
})

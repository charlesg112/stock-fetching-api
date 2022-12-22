import { WebsocketDirectory } from '../../../src/api/websockets/websocket-directory';
import { WebsocketBuilder } from './websocket-builder';
import { StockBuilder } from '../../helpers/stock-builder';

describe("WebSocket Directory Tests", () => {

    const STOCK_ID = "1";
    const sendMock = jest.fn();
    const stock = new StockBuilder().withId(STOCK_ID).build();
    const websocket = new WebsocketBuilder().withSend(sendMock).build();
    const websocketDirectory = new WebsocketDirectory();

    test("When adding subscription Then websocket is subscribed", () => {
        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.notifyStockUpdate(stock);
        expect(sendMock.mock.calls.length).toBe(1);
    })
})

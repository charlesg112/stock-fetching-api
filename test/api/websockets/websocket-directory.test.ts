import { WebsocketDirectory } from '../../../src/api/websockets/websocket-directory';
import { WebsocketBuilder } from './websocket-builder';
import { StockBuilder } from '../../helpers/stock-builder';

describe('WebSocket Directory Tests', () => {
    const STOCK_ID = '1';
    const UNSUBSCRIBED_STOCK_ID = '2';
    const sendMock = jest.fn();
    const stock = new StockBuilder().withId(STOCK_ID).build();
    const unsubscribed_stock = new StockBuilder().withId(UNSUBSCRIBED_STOCK_ID).build();
    const websocket = new WebsocketBuilder().withSend(sendMock).build();
    let websocketDirectory = new WebsocketDirectory();

    beforeEach(() => {
        jest.clearAllMocks();
        websocketDirectory = new WebsocketDirectory();
    });

    test('When adding subscription Then websocket is subscribed', () => {
        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.notifyStockUpdate(stock);
        expect(sendMock.mock.calls.length).toBe(1);
    });

    test('Given subscribed websocket When notifying stock update for subscribed stock Then websocket is notified', () => {
        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.notifyStockUpdate(stock);

        expect(sendMock.mock.calls.length).toBe(1);
    });

    test('Given subscribed websocket When notifying stock update for an unsubscribed stock Then websocket is not notified', () => {
        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.notifyStockUpdate(unsubscribed_stock);

        expect(sendMock.mock.calls.length).toBe(0);
    });

    test('Given subscribed websocket When subscribing to already subscribed stock Then websocket is subscribed only once', () => {
        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.addSubscription(websocket, STOCK_ID);

        websocketDirectory.notifyStockUpdate(stock);
        expect(sendMock.mock.calls.length).toBe(1);
    });
});

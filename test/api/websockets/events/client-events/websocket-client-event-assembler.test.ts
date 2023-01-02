import { WebsocketEvents } from '../../../../../src/api/websockets/events/websocket-events';
import {
    WebsocketClientEventAssembler
} from '../../../../../src/api/websockets/events/client-events/websocket-client-event-assembler';
import { WebsocketDirectory } from '../../../../../src/api/websockets/websocket-directory';
import { EventParser } from '../../../../../src/api/websockets/events/event-parser';
import { StockSubscribeEvent } from '../../../../../src/api/websockets/events/client-events/stock-subscribe-event';

describe("WebsocketClientEventAssembler tests", () => {

    const stockIds = ['1', '2'];
    const subscribeMessageData = {
        event: WebsocketEvents.STOCK_SUBSCRIBE,
        payload: {
            stockIds
        }
    }

    const websocketDirectory = new WebsocketDirectory();
    const eventParser = new EventParser();
    const websocketClientEventAssembler = new WebsocketClientEventAssembler(websocketDirectory, eventParser);

    test("Given stock subscribe event When parsing event Then creates stock subscribe event", () => {
        const stockSubscribeEvent = JSON.stringify(subscribeMessageData);

        const event = websocketClientEventAssembler.parseEvent(stockSubscribeEvent);

        expect(event).toBeInstanceOf(StockSubscribeEvent)
    })

})
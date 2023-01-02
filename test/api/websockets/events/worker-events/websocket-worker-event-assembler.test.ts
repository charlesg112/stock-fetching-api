import { WebsocketEvents } from '../../../../../src/api/websockets/events/websocket-events';
import {
    WebsocketWorkerEventAssembler
} from '../../../../../src/api/websockets/events/worker-events/websocket-worker-event-assembler';
import { WebsocketDirectory } from '../../../../../src/api/websockets/websocket-directory';
import { EventParser } from '../../../../../src/api/websockets/events/event-parser';
import { StockUpdateEvent } from '../../../../../src/api/websockets/events/worker-events/stock-update-event';

describe("WebsocketWorkerEventAssembler tests", () => {

    const updateMessageData = {
        event: WebsocketEvents.STOCKS_UPDATE,
        payload: {
            id: '123',
            symbol: 'AC.TO',
            exchange: 'TSX',
            currency: 'CAD',
            lastUpdate: new Date(),
            nextUpdate: new Date(),
            lastValue: 10.0,
            state: 'open'
        }
    }

    const websocketDirectory = new WebsocketDirectory();
    const eventParser = new EventParser();
    const websocketWorkerEventAssembler = new WebsocketWorkerEventAssembler(websocketDirectory, eventParser);

    test("Given stock update event When parsing event Then creates stock update event ", () => {
        const stockUpdateEvent = JSON.stringify(updateMessageData);

        const event = websocketWorkerEventAssembler.parseEvent(stockUpdateEvent);

        expect(event).toBeInstanceOf(StockUpdateEvent);
    })
})
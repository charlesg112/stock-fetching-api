import { WebsocketDirectory } from '../../websocket-directory';
import { WebsocketEvent } from '../websocket-event';
import { WebsocketEvents } from '../websocket-events';
import { StockSubscribeEvent } from './stock-subscribe-event';
import { EventTypeDoesNotExistError } from '../../exceptions/event-type-does-not-exist-error';
import { EventParser } from '../event-parser';

export class WebsocketClientEventAssembler {
    private readonly websocketDirectory: WebsocketDirectory;
    private readonly eventParser: EventParser;

    public constructor(websocketDirectory: WebsocketDirectory, eventParser: EventParser) {
        this.websocketDirectory = websocketDirectory;
        this.eventParser = eventParser;
    }

    public parseEvent(event: string): WebsocketEvent {
        const parsedEvent = this.eventParser.parseEventJSON(event);
        const eventType = this.eventParser.getProperty(parsedEvent, 'event');
        const payload = this.eventParser.getProperty(parsedEvent, 'payload');

        switch (eventType) {
            case WebsocketEvents.STOCK_SUBSCRIBE:
                const stockIds = this.eventParser.getProperty(payload, 'stockIds');
                return new StockSubscribeEvent(stockIds, this.websocketDirectory);
            default:
                throw new EventTypeDoesNotExistError();
        }
    }
}

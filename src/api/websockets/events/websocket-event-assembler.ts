import { WebsocketEvents } from './websocket-events';
import { WebsocketEvent } from './websocket-event';
import { StockSubscribeEvent } from './stock-subscribe-event';
import { WebsocketDirectory } from '../websocket-directory';
import { StockUpdateEvent } from './stock-update-event';
import { EventCannotBeParsedError } from '../exceptions/event-cannot-be-parsed-error';
import { EventMissingPropertyError } from '../exceptions/event-missing-property-error';
import { EventTypeDoesNotExistError } from '../exceptions/event-type-does-not-exist-error';

export class WebsocketEventAssembler {
    private readonly websocketDirectory: WebsocketDirectory;

    public constructor(websocketDirectory: WebsocketDirectory) {
        this.websocketDirectory = websocketDirectory;
    }

    public parseEvent(event: string): WebsocketEvent {
        const parsedEvent = WebsocketEventAssembler.parseEventJSON(event);
        const eventType = WebsocketEventAssembler.getProperty(parsedEvent, 'event');
        const payload = WebsocketEventAssembler.getProperty(parsedEvent, 'payload');

        switch (eventType) {
            case WebsocketEvents.STOCK_SUBSCRIBE:
                const stockIds = WebsocketEventAssembler.getProperty(payload, 'stockIds');
                return new StockSubscribeEvent(stockIds, this.websocketDirectory);
            case WebsocketEvents.STOCKS_UPDATE:
                return new StockUpdateEvent();
            default:
                throw new EventTypeDoesNotExistError();
        }
    }

    private static parseEventJSON(event: string): any {
        try {
            return JSON.parse(event);
        } catch (e) {
            throw new EventCannotBeParsedError();
        }
    }

    private static getProperty(object: any, fieldName: string): any {
        const field = object[fieldName]
        if (field == undefined) {
            throw new EventMissingPropertyError(fieldName);
        }
        return field;
    }

}

import { EventCannotBeParsedError } from '../exceptions/event-cannot-be-parsed-error';
import { EventMissingPropertyError } from '../exceptions/event-missing-property-error';

export class EventParser {
    public parseEventJSON(event: string): any {
        try {
            return JSON.parse(event);
        } catch (e) {
            throw new EventCannotBeParsedError();
        }
    }

    public getProperty(object: any, propertyName: string): any {
        const property = object[propertyName];
        if (property == undefined) {
            throw new EventMissingPropertyError(propertyName);
        }
        return property;
    }
}

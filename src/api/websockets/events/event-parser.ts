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

    public getProperty(object: any, fieldName: string): any {
        const field = object[fieldName];
        if (field == undefined) {
            throw new EventMissingPropertyError(fieldName);
        }
        return field;
    }

}

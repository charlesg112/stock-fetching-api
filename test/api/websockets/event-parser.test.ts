import { EventParser } from '../../../src/api/websockets/events/event-parser';
import { EventCannotBeParsedError } from '../../../src/api/websockets/exceptions/event-cannot-be-parsed-error';
import { EventMissingPropertyError } from '../../../src/api/websockets/exceptions/event-missing-property-error';

describe('EventParser tests', () => {
    const eventParser = new EventParser();

    test('Given JSON string When parsing event Then returns object', () => {
        const value = 123;
        const object = {
            value
        };
        const jsonString = JSON.stringify(object);

        const parsedObject = eventParser.parseEventJSON(jsonString);

        expect(parsedObject.value).toBe(value);
    });

    test('Given non-JSON string When parsing event Then error occurs', () => {
        const nonJsonString = 'whats uppppp';

        const eventParsing = () => eventParser.parseEventJSON(nonJsonString);

        expect(eventParsing).toThrow(EventCannotBeParsedError);
    });

    test('Given event payload with property When getting property Then property value is returned', () => {
        const value = 123;
        const object = {
            value
        };

        const parsedProperty = eventParser.getProperty(object, 'value');

        expect(parsedProperty).toBe(value);
    });

    test('Given event payload with missing property When getting property Then error occurs', () => {
        const value = 123;
        const object = {
            value
        };

        const propertyParsing = () => eventParser.getProperty(object, 'propertyNameThatDoesntExist');

        expect(propertyParsing).toThrow(EventMissingPropertyError);
    });
});

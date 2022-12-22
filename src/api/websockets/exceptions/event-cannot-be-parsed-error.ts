export class EventCannotBeParsedError extends Error {

    constructor() {
        super('The event must be in JSON format to be parsed.');
    }
}

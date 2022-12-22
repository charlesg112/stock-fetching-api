export class EventTypeDoesNotExistError extends Error {
    constructor() {
        super('The event type does not exist');
    }

}
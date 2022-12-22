export class EventMissingPropertyError extends Error {

    constructor(fieldName: string) {
        super(`The event is missing the following property : ${fieldName}`);
    }
}
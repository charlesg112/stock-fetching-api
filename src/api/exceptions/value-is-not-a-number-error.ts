export class ValueIsNotANumberError extends Error {
    constructor(fieldName: string) {
        super(`${fieldName} must be a number.`);
    }
}

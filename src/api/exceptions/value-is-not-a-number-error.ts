export class ValueIsNotANumberError extends Error {

    fieldName: string;

    constructor(fieldName: string) {
        super(`${fieldName} must be a number.`);
        this.fieldName = fieldName;
    }
}

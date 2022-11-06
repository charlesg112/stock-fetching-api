import { Response } from 'express';

export class ExpressResponseBuilder {
    private json;

    constructor() {
        this.json = jest.fn();
    }

    public build(): Response {
        return {
            json: jest.fn()
        } as unknown as Response;
    }
}

import {Request} from "express";

export class ExpressRequestBuilder {
    private params;
    private query;

    constructor() {
        this.params = {};
        this.query = {};
    }

    public withParam(param: any): ExpressRequestBuilder {
        Object.assign(this.params, param)
        return this;
    }

    public build(): Request {
        return {
            params: {
                ...this.params
            },
            query: {
                ...this.query
            }
        } as unknown as Request;
    }

}

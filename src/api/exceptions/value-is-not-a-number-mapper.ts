import { Errback, NextFunction, Request, Response } from 'express';
import { ValueIsNotANumberError } from './value-is-not-a-number-error';

export const valueIsNotANumberMapper = (err: any, req: any, res: any, next: any) => {
    if (err instanceof ValueIsNotANumberError) {
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: `${err.fieldName} should be a number.` });
    } else {
        next(err);
    }
};

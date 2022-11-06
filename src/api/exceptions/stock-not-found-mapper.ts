import {StockNotFoundError} from "../../persistence/stock-not-found-error";

export const stockNotFoundMapper = (err: any, req: any, res: any, next: any) => {
    if (err instanceof StockNotFoundError) {
        res.status(404);
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: `Stock with id ${err.stockId} was not found` });
    }
    else {
        next(err);
    }
};

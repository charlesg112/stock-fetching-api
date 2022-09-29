import express, {Request, Response} from "express";
import {StockServiceImpl} from "../domain/stock-service-impl";
import {StockService} from "../domain/stock-service";

export class StockApi {
    private service: StockService;
    private readonly router: express.Router;

    constructor(service: StockService) {
        this.service = service;
        this.router = express.Router();
        this.setRoutes();
    }

    getRouter(): express.Router {
        return this.router;
    }

    private setRoutes() {
        this.router.get('/stocks', async (req: Request, res: Response) => {
            const stocks = await this.service.getWatchedStocks();

            res.json(stocks);
        });

        this.router.get('/stocks/:id', async (req: Request, res: Response) => {
            const stock = await this.service.getStock(req.params.id);

            res.json(stock);
        })

        this.router.get('/stocks/:id/updates', async (req: Request, res: Response) => {
            const updates = await this.service.getStockUpdates(req.params.id);

            res.json(updates);
        })
    }
}

import express, {Request, Response} from "express";
import {StockServiceImpl} from "../service/stock-service-impl";
import {StockService} from "../service/stock-service";
import {isNumberObject} from "util/types";
import {StockUpdateAssembler} from "./stock-update-assembler";

export class StockApi {
    private service: StockService;
    private updateAssembler: StockUpdateAssembler;
    private readonly router: express.Router;

    constructor(service: StockService, updateAssembler: StockUpdateAssembler) {
        this.service = service;
        this.updateAssembler = updateAssembler;
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
            try {
                const updateDto = this.updateAssembler.toDto(req.params.id, req.query.limit);

                const updates = await this.service.getStockUpdates(updateDto);

                res.json(updates);
            } catch (e) {
                res.status(400).json({"error": "Limit parameter has invalid value"});
            }
        })
    }
}

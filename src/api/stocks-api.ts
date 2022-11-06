import express, {NextFunction, Request, Response} from "express";
import {StockService} from "../service/stock-service";
import {StockUpdateAssembler} from "./stock-update-assembler";
import {valueIsNotANumberMapper} from "./exceptions/value-is-not-a-number-mapper";

export class StockApi {
    private service: StockService;
    private updateAssembler: StockUpdateAssembler;
    private readonly router: express.Router;

    constructor(service: StockService, stockUpdateAssembler: StockUpdateAssembler) {
        this.service = service;
        this.updateAssembler = stockUpdateAssembler;
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

        this.router.get('/stocks/:id/updates', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const updateDto = this.updateAssembler.toDto(req.params.id, req.query.limit);

                const updates = await this.service.getStockUpdates(updateDto);

                res.json(updates);
            }
            catch (e) {
                next(e);
            }
        })
    }
}

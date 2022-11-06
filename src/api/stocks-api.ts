import express, { NextFunction, Request, Response } from 'express';
import { StockService } from '../service/stock-service';
import { StockUpdateAssemblerImpl } from './stock-update-assembler-impl';
import { valueIsNotANumberMapper } from './exceptions/value-is-not-a-number-mapper';
import { StockUpdateAssembler } from './stock-update-assembler';

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
        this.router.get('/stocks', this.getWatchedStocks);

        this.router.get('/stocks/:id', this.getStockById);

        this.router.get('/stocks/:id/updates', this.getStockUpdates);
    }

    public getWatchedStocks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stocks = await this.service.getWatchedStocks();

            res.json(stocks);
        } catch (e) {
            next(e);
        }
    };

    public getStockById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stock = await this.service.getStock(req.params.id);

            res.json(stock);
        } catch (e) {
            next(e);
        }
    };

    public getStockUpdates = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateDto = this.updateAssembler.toDto(req.params.id, req.query.limit);

            const updates = await this.service.getStockUpdates(updateDto);

            res.json(updates);
        } catch (e) {
            next(e);
        }
    };
}

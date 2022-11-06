import {StockUpdateDto} from "../service/stock-update-dto";

export interface StockUpdateAssembler {
    toDto(id: string, limit: any): StockUpdateDto;
}

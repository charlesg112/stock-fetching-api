import {StockUpdateDto} from "../service/stock-update-dto";
import {ValueIsNotANumberError} from "./exceptions/value-is-not-a-number-error";
import {StockUpdateAssembler} from "./stock-update-assembler";

export class StockUpdateAssemblerImpl implements StockUpdateAssembler {
    toDto(id: string, limit: any): StockUpdateDto {
        const value = this.toNumber(limit);
        return new StockUpdateDto(id, value);
    }

    private toNumber(value: any): number | null {
        try {
            if (!value) {
                return null;
            }

            const limitNumber = Number(value as string);
            if (Number.isInteger(limitNumber)) {
                return limitNumber;
            }
        } catch(e) {
        }
        throw new ValueIsNotANumberError("limit");
    }
}

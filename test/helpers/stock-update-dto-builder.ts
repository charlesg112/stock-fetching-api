import { StockUpdateDto } from '../../src/service/stock-update-dto';

export class StockUpdateDtoBuilder {
    private id: string;
    private limit: number | null;

    constructor() {
        this.id = '5';
        this.limit = 100;
    }

    public withId(id: string) {
        this.id = id;
        return this;
    }

    public build(): StockUpdateDto {
        return new StockUpdateDto(this.id, this.limit);
    }
}

export class StockUpdateDto {
    id: string;
    limit: number | null;

    constructor(id: string, limit: number | null) {
        this.id = id;
        this.limit = limit;
    }
}

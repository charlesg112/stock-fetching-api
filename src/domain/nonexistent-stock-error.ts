export class NonexistentStockError extends Error {
    constructor(id: string) {
        super(`The following stock could not be found : ${id}`);
    }
}

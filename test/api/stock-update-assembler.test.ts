import {StockUpdateAssembler} from "../../src/api/stock-update-assembler";

describe("Stock update assembler tests", () => {

    const LIMIT_VALUE_AS_STRING = "10";
    const LIMIT_VALUE = 10;

    const stockUpdateAssembler = new StockUpdateAssembler();

    test("Given string limit When assembling request Then returns value", () => {
        const requestDto = stockUpdateAssembler.toDto(LIMIT_VALUE_AS_STRING);

        expect(requestDto.limit).toBe(LIMIT_VALUE);
    });

    test("Given undefined limit When assembling request Then returns null", () => {
        const requestLimit = undefined;

        const requestDto = stockUpdateAssembler.toDto(requestLimit);

        expect(requestDto.limit).toBeNull();
    });

    test("Given malformed limit When assembling request Then throws", () => {
        const malformedLimit = "1asd";

        const assemblingRequest = () => stockUpdateAssembler.toDto(malformedLimit);

        expect(assemblingRequest).toThrow();
    });

})

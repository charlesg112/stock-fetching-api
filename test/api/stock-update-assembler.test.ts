import {StockUpdateAssemblerImpl} from "../../src/api/stock-update-assembler-impl";

describe("Stock update assembler tests", () => {

    const AN_ID = "123";
    const LIMIT_VALUE_AS_STRING = "10";
    const LIMIT_VALUE = 10;

    const stockUpdateAssembler = new StockUpdateAssemblerImpl();

    test("Given string limit When assembling request Then returns valid dto", () => {
        const requestDto = stockUpdateAssembler.toDto(AN_ID, LIMIT_VALUE_AS_STRING);

        expect(requestDto.id).toBe(AN_ID);
        expect(requestDto.limit).toBe(LIMIT_VALUE);
    });

    test("Given undefined limit When assembling request Then returns null", () => {
        const requestLimit = undefined;

        const requestDto = stockUpdateAssembler.toDto(AN_ID, requestLimit);

        expect(requestDto.limit).toBeNull();
    });

    test("Given malformed limit When assembling request Then throws", () => {
        const malformedLimit = "1asd";

        const assemblingRequest = () => stockUpdateAssembler.toDto(AN_ID, malformedLimit);

        expect(assemblingRequest).toThrow();
    });

})

import { Test, ISafetyCheck } from '..'
import { mockDate } from './mockDate.mjs';

describe('Klasse Test', () => {
    const date = Date;

    beforeEach(() => {
        Date = mockDate("2023-01-10T12:00:00.000Z");
    });

    afterAll(() => {
        Date = date;
    });

    test("T1 | sollte von ISafetyCheck erben", () => {
        const t = new Test();
        expect(t).toBeInstanceOf(ISafetyCheck);
    });

    test("T2 | sollte eine adaptierte Ausgabe haben: toString", () => {
        const t = new Test();
        t.testDate = new Date("2022-01-01");
        expect(t.toString()).toEqual("Test: 2022-01-01T00:00:00.000Z");
    });

    describe('Datumsparameter', () => {
        test("T3 | sollte beim Setzen automatisch zu einem Datum werden", () => {
            const t = new Test();
            t.testDate = "2022-02-02";
            expect(t.testDate).toEqual(new Date("2022-02-02"));
        });
    });

    describe('isValid', () => {
        test("T4 | sollte nur 48h gültig sein", () => {
            const t = new Test();
            t.testDate = "2023-01-01";
            expect(t.isValid(new Date())).toEqual(false);

            t.testDate = new Date("2023-01-08T12:01:00.000Z");
            expect(t.isValid(new Date())).toEqual(true);

            t.testDate = new Date("2023-01-08T11:59:59.999Z");
            expect(t.isValid(new Date())).toEqual(false);
        });
    });
});
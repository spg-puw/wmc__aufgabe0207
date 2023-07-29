import { Cured, ISafetyCheck } from '..'
import { mockDate } from './mockDate.mjs';

describe('Klasse Cured', () => {
    const date = Date;

    beforeEach(() => {
        Date = mockDate("2023-01-10T12:00:00.000Z");
    });

    afterAll(() => {
        Date = date;
    });

    test("T1 | sollte von ISafetyCheck erben", () => {
        const t = new Cured();
        expect(t).toBeInstanceOf(ISafetyCheck);
    });

    test("T2 | sollte eine adaptierte Ausgabe haben: toString", () => {
        const t = new Cured();
        t.dateOfDiagnosis = new Date("2022-01-01");
        expect(t.toString()).toEqual("Cured: 2022-01-01T00:00:00.000Z");
    });

    describe('Datumsparameter', () => {
        test("T3 | sollte beim Setzen automatisch zu einem Datum werden", () => {
            const t = new Cured();
            t.dateOfDiagnosis = "2022-02-02";
            expect(t.dateOfDiagnosis).toEqual(new Date("2022-02-02"));
        });
    });

    describe('isValid', () => {
        test("T4 | sollte nur 180d gültig sein", () => {
            const t = new Cured();
            t.dateOfDiagnosis = "2023-01-01";
            expect(t.isValid(new Date())).toEqual(true);

            t.dateOfDiagnosis = new Date("2022-07-14T11:59:00.000Z");
            expect(t.isValid(new Date())).toEqual(false);

            t.dateOfDiagnosis = new Date("2022-07-14T12:01:00.000Z");
            expect(t.isValid(new Date())).toEqual(true);
        });
    });
});
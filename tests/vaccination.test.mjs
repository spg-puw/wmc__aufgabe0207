import { Vaccination, ISafetyCheck } from '..'
import { mockDate } from './mockDate.mjs';

describe('Klasse Vaccination', () => {
    const date = Date;

    beforeEach(() => {
        Date = mockDate("2023-01-10T12:00:00.000Z");
    });

    afterAll(() => {
        Date = date;
    });

    test("T1 | sollte von ISafetyCheck erben", () => {
        const t = new Vaccination();
        expect(t).toBeInstanceOf(ISafetyCheck);
    });

    test("T2 | sollte eine adaptierte Ausgabe haben: toString", () => {
        const t = new Vaccination();
        t.firstVaccination = new Date("2022-01-01");
        t.secondVaccination = new Date("2022-06-01");
        expect(t.toString()).toEqual("Vaccination: 2022-01-01T00:00:00.000Z, 2022-06-01T00:00:00.000Z");
    });

    describe('Datumsparameter', () => {
        test("T3 | sollte beim Setzen automatisch zu einem Datum werden", () => {
            const t = new Vaccination();
            
            t.firstVaccination = "2022-02-02";
            expect(t.firstVaccination).toEqual(new Date("2022-02-02"));
            
            t.secondVaccination = "2022-06-02";
            expect(t.secondVaccination).toEqual(new Date("2022-06-02"));
        });

        test("T4 | secondVaccination sollte nicht vor firstVaccination gesetzt werden können", () => {
            const t = new Vaccination();
            expect(t).toBeInstanceOf(ISafetyCheck);
            
            t.secondVaccination = "2022-02-02";
            expect(t.secondVaccination).toBeFalsy();
        });

        test("T5 | secondVaccination sollte nicht gesetzt werden können, wenn firstVaccination ungültig", () => {
            const t = new Vaccination();
            expect(t).toBeInstanceOf(ISafetyCheck);
            
            t.firstVaccination = "ungueltig"
            t.secondVaccination = "2022-02-02";
            
            expect(t.secondVaccination).toBeFalsy();
        });
        
        test("T6 | secondVaccination sollte nicht überschrieben werden können", () => {
            const t = new Vaccination();
            t.firstVaccination = "2022-01-01";
            t.secondVaccination = "2022-02-02";
            t.secondVaccination = "2022-03-03";
            expect(t.secondVaccination).toEqual(new Date("2022-02-02"));
        });
    });
    
    describe('isValid', () => {
        test("T7 | sollte nur 270d gültig sein", () => {
            const t = new Vaccination();
            
            t.firstVaccination = "2022-01-01";
            t.secondVaccination = "2023-01-01T12:00:00.000Z";

            expect(t.isValid(new Date("2023-06-01"))).toEqual(true);
            expect(t.isValid(new Date("2023-09-28T11:59:00.000Z"))).toEqual(true);
            expect(t.isValid(new Date("2023-09-28T12:01:00.000Z"))).toEqual(false);
        });
    });
});
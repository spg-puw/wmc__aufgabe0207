import { Employee, Test } from '..'
import { mockDate } from './mockDate.mjs';

describe('Klasse Employee', () => {
    const date = Date;

    beforeEach(() => {
        Date = mockDate("2023-01-10T12:00:00.000Z");
    });

    afterAll(() => {
        Date = date;
    });

    test("T1 | Name sollte funktionieren", () => {
        const t = new Employee();
        t.firstName = "Max";
        t.lastName = "Test";
        expect(t.firstName).toEqual("Max");
        expect(t.lastName).toEqual("Test");
    });

    test("T2 | Anzahl der Checks sollte richtig sein", () => {
        const t = new Employee();
        t.addSafetyCheck(new Test())
        t.addSafetyCheck(new Test())
        t.addSafetyCheck(new Test())
        t.addSafetyCheck(new Test())
        t.addSafetyCheck(new Test())
        expect(t.safetyChecksAmount).toEqual(5);
    });

    test("T3 | Liste an Checks sollte funktionieren", () => {
        const t = new Employee();

        for (let i=1; i<=5; i++) {
            const c = new Test();
            c.testDate = new Date(`2020-01-0${i}T12:00:00.000Z`);
            t.addSafetyCheck(c);
        }
        
        const checks = [];
        for (const c of t.safetyChecks) {
            checks.push(c);
        }

        expect(checks.length).toEqual(5);
        expect(checks.at(-1).testDate).toEqual(new Date("2020-01-05T12:00:00.000Z"));
    });

    test("T4 | isSafe Methode sollte richtiges Ergebnis berechnen", () => {
        const t = new Employee();

        for (let i=1; i<=5; i++) {
            const c = new Test();
            c.testDate = new Date(`2020-01-0${i}T12:00:00.000Z`);
            t.addSafetyCheck(c);
        }

        expect(t.isSafe(new Date())).toEqual(false);
        expect(t.isSafe(new Date("2020-01-02"))).toEqual(true);
        
        const c = new Test();
        c.testDate = new Date(`2023-01-01T12:00:00.000Z`);
        t.addSafetyCheck(c);
        
        expect(t.isSafe(new Date("2023-01-02"))).toEqual(true);
        expect(t.isSafe(new Date())).toEqual(false);
    });
});
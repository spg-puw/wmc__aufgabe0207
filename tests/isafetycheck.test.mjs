import { ISafetyCheck } from '..'

describe('Klasse ISafetyCheck', () => {
    test("T1 | sollte eine Klasse sein", () => {
        expect(() => {
            ISafetyCheck();
        }).toThrow(/^Class constructor/);
    });

    test("T2 | sollte bei new eine Exception auslösen", () => {
        expect(() => {
            new ISafetyCheck();
        }).not.toThrow("is not a constructor");

        expect(() => {
            new ISafetyCheck();
        }).toThrow();
    });

    if (ISafetyCheck?.prototype?.isValid) {
        test("T3 | sollte bei isValid undefined zurückgeben", () => {
            expect(typeof ISafetyCheck.prototype.isValid).toEqual("function");
            expect(() => {
                ISafetyCheck.prototype.isValid();
            }).not.toThrow();
            expect(ISafetyCheck.prototype.isValid()).toStrictEqual(undefined);
        });
    }
    else {
        test("T3 | sollte eine Exception auslösen, wenn isValid bei Vererbung nicht implementiert wurde", () => {
            expect(() => {
                class TestClass extends ISafetyCheck {};
                new TestClass();
            }).not.toThrow("Class extends value undefined is not a constructor or null");

            expect(() => {
                class TestClass extends ISafetyCheck {};
                new TestClass();
            }).toThrow();
        });
    }
});
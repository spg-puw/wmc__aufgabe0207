import { ISafetyCheck } from './isafetycheck.mjs';

export class Employee {
    get firstName() { }

    get lastName() { }

    get safetyChecks() { }
    
    // number of elements in your collection
    get safetyChecksAmount() { }

    addSafetyCheck(check) { }

    isSafe(date) { }

    toString() {
        return `Empoyee: ${this.firstName} ${this.lastName} with ${this.safetyChecksAmount} check/s (today: ${this.isSafe(new Date()) ? "" : "not "}safe)`;
    }
}
import { Employee } from './classes/employee.mjs';
import { ISafetyCheck } from './classes/isafetycheck.mjs';
import { Test } from './classes/coronatest.mjs';
import { Cured } from './classes/cured.mjs';
import { Vaccination } from './classes/vaccination.mjs';

export function main() {
    // write your own code here, to test your application
    try {
        const e = new Employee();
        e.firstName = "Hans";
        e.lastName = "Wurst"
    
        const c1 = new Test();
        c1.testDate = '2022-01-01';
        e.addSafetyCheck(c1);
    
        const c2 = new Vaccination();
        c2.firstVaccination = "2022-01-01";
        c2.secondVaccination = new Date("2022-12-01");
        e.addSafetyCheck(c2);
    
        const c3 = new Cured();
        c3.dateOfDiagnosis = new Date("2022-06-01");

        console.log(e.toString());
        if (e.safetyChecks) {
            console.log("checks:");
            for (const c of e.safetyChecks) {
                console.log(c.toString());
            }
        }
        else {
            console.log("no checks found");
        }
    } catch (e) {
        console.log("there is still a lot to do");
        console.error(e);
    }

}

export { Employee, ISafetyCheck, Test, Cured, Vaccination }
if (import.meta.url.endsWith(process.argv[1])) {
    main();
}

import { validations } from "./fixtures/fixtures";
import { MyValidation } from "./MyValidation";

/**
 * validation list of the fields of the form
 */
let myValidation: MyValidation;
/**
 * date form regex MM/YY as validation rule for test MyValidation
 */
let regExpDate: RegExp = validations[0].getRuleFormat();

/**
 * It expects the constructor call to throw an error because  regular expresion rule is mandatory
 * but undefined
 */
it('constructor without mandatory regexp', function (): void {
    let creation = function (): void {
        myValidation = new MyValidation("required", undefined);
    }
    expect(creation).toThrowError();
});
/**
 * It expects the constructor call to throw an error because required error message is mandatory
 * but undefined
 */
it('constructor without mandatory required message', function (): void {
    let creation = function (): void {
        myValidation = new MyValidation(undefined, regExpDate);
    }
    expect(creation).toThrowError();
});
/**
 * It expects to match class attributes with constructor parameters
 */
it('constructor check both fields', function (): void {
    myValidation = new MyValidation("required", regExpDate);
    expect(myValidation.getRuleFormat()).toEqual(regExpDate);
    expect(myValidation.getErrorMessage()).toBe("required");
});
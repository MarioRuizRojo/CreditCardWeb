import { MyValidator } from "./MyValidator";
import { inputsFail, inputsOk, validations } from "./fixtures/fixtures";

let validator: MyValidator;

/**
 * It sets validator default from test data set
 */
beforeEach(function () {
    validator = new MyValidator(validations, "required");
});

/**
 * It expects the constructor call to throw an error because validations list is mandatory
 * but undefined
 */
it('constructor without mandatory validations list', function (): void {
    let creation = function (): void {
        validator = new MyValidator(undefined, "required");
    }
    expect(creation).toThrowError();
});
/**
 * It expects the constructor call to throw an error because required error message is mandatory
 * but undefined
 */
it('constructor without mandatory required error message', function (): void {
    let creation = function (): void {
        validator = new MyValidator(validations, undefined);
    }
    expect(creation).toThrowError();
});
/**
 * It expect to pass all validations when using inputsOk data set from tests data set
 * All of them meet its rule
 */
it('method all passed ok', function (): void {
    validator.validateAll(inputsOk);
    expect(validator.allPassed()).toBe(true);
});
/**
 * It expect to fail some validation when using inputsFail data set from tests data set
 * None of them meet its rule
 */
it('method all passed fail', function (): void {
    validator.validateAll(inputsFail);
    expect(validator.allPassed()).toBe(false);
});
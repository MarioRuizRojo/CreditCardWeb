import type { MyValidation } from "./MyValidation";

/**
 * It checks all validations and print errors in form when some dont meet their rule
 */
export class MyValidator {
    /**
     * Validations list
     */
    private validations: MyValidation[];
    /**
     * Validations passed state list
     */
    private passed: boolean[];
    /**
     * Error messages list to show when validation fails
     */
    private errorsToShow: string[];
    /**
     * Required error message
     */
    private requiredError: string;

    /**
     * It throws error if validations list is undefined
     * It throws error if required error message undefined
     * @param validations validations list
     * @param requiredError required error message
     */
    private checkAllNeededPropsCreateMyValidator(validations: MyValidation[], requiredError: string): void {
        if (validations == undefined || validations == null) throw new Error("without validations list cannot create MyValidator");
        if (requiredError == null || requiredError == undefined) throw new Error("without requiredError message cannot create MyValidator");
    }

    /**
     * It checks params not to be undefined and initializes validations passed state list
     * and error messages list 
     * @param validations validations list
     * @param requiredError required error message
     */
    constructor(validations: MyValidation[], requiredError: string) {
        this.checkAllNeededPropsCreateMyValidator(validations, requiredError);
        this.validations = validations;
        this.requiredError = requiredError;
        let quantity: number = validations.length;
        this.passed = Array(quantity);
        this.passed.fill(false);
        this.errorsToShow = Array(quantity);
        this.errorsToShow.fill('');
    }

    /**
     * @returns all validations passed successfully
     */
    public allPassed(): boolean {
        //returns true if validation has not passed the Regexp
        let validationNotPassed: (boolean) => boolean = function (passedx: boolean): boolean {
            return !passedx;
        }
        return this.passed.filter(validationNotPassed).length == 0;
    }

    /**
     * It execute validateField function over all input's texts
     * @param inputs texts of the inputs of the fields
     */
    public validateAll(inputs: string[]): void {
        inputs.forEach((input: string, index: number) => this.validateField(input, index));
    }

    /**
     * It makes the form to show required error message if the input is empty
     * and makes the form to show other error messages if the input text doesnt meet its rule
     */
    public validateField(input: string, index: number): void {
        if (input != '') {
            let validation: MyValidation = this.validations[index];
            let format: RegExp = validation.getRuleFormat();
            let expectedToBeEmpty: string = input.replace(format, '');
            if (expectedToBeEmpty == '') {
                this.passed[index] = true;
                this.errorsToShow[index] = '';
            }
            else {
                this.passed[index] = false;
                this.errorsToShow[index] = validation.getErrorMessage();
            }
        }
        else {
            this.passed[index] = false;
            this.errorsToShow[index] = this.requiredError;
        }
    }

    /**
     * 
     * @returns required error message
     */
    public getRequiredError(): string {
        return this.requiredError;
    }

    /**
     * 
     * @param requiredError required error message to set
     */
    public setRequiredError(requiredError: string): void {
        this.requiredError = requiredError;
    }

    /**
     * 
     * @returns error messages to show if validations fail
     */
    public getErrorsToShow(): string[] {
        return this.errorsToShow;
    }

    /**
     * 
     * @param errorsToShow error messages to set
     */
    public setErrorsToShow(errorsToShow: string[]): void {
        this.errorsToShow = errorsToShow;
    }

    /**
     * 
     * @returns validations list
     */
    public getValidations(): MyValidation[] {
        return this.validations;
    }

    /**
     * 
     * @param validations validations list to set
     */
    public setValidations(validations: MyValidation[]): void {
        this.validations = validations;
    }

    /**
     * 
     * @returns validations passed state list
     */
    public getPassed(): boolean[] {
        return this.passed;
    }

    /**
     * 
     * @param passed validations passed state list to set
     */
    public setPassed(passed: boolean[]): void {
        this.passed = passed;
    }
}
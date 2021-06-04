/**
 * It represents the validation rule and its error message
 * of a field input of a form
 */
export class MyValidation {
    /**
     * error message to show
     */
    private errorMessage: string;
    /**
     * regular expresion rule
     */
    private ruleFormat: RegExp;

    /**
     * It throws error if the regular expresion rule is undefined
     * It throws error if the error message to show is undefined
     * @param errorMessage error message to show
     * @param ruleFormat regular expresion rule
     */
    private checkAllNeededPropsCreateMyValidation(errorMessage: string, ruleFormat: RegExp): void {
        if (errorMessage == undefined || errorMessage == null) throw new Error("without errorMessage cannot create MyValidation");
        if (ruleFormat == null || ruleFormat == undefined) throw new Error("without ruleFormat cannot create MyValidation");
    }

    /**
     * It checks params not to be undefined and creates the object
     * @param errorMessage error message to show
     * @param ruleFormat regular expresion rule
     */
    constructor(errorMessage: string, ruleFormat: RegExp) {
        this.checkAllNeededPropsCreateMyValidation(errorMessage, ruleFormat);
        this.errorMessage = errorMessage;
        this.ruleFormat = ruleFormat;
    }

    /**
     * 
     * @returns error message to show
     */
    public getErrorMessage(): string {
        return this.errorMessage;
    }

    /**
     * 
     * @param errorMessage error message to show to set
     */
    public setErrorMessage(errorMessage: string): void {
        this.errorMessage = errorMessage;
    }

    /**
     * 
     * @returns regular expresion rule
     */
    public getRuleFormat(): RegExp {
        return this.ruleFormat;
    }

    /**
     * 
     * @param ruleFormat regular expresion rule to set
     */
    public setRuleFormat(ruleFormat: RegExp): void {
        this.ruleFormat = ruleFormat;
    }
}
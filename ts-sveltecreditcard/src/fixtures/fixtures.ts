import { CreditCardC } from "../CreditCardC";
import { MyValidation } from "../MyValidation";

/**
 * JSON object with mandatory credit card attributes
 */
let dataCreditCard1: any = {
    holderName: "holderName",
    cardNumber: "1234561234567890",
    expirationDate: "11/11",
    cvv: "123"
}
/**
 * JSON object with mandatory credit card attributes
 */
let dataCreditCard2: any = {
    holderName: "holderName2",
    cardNumber: "1234567890123456",
    expirationDate: "01/01",
    cvv: "321"
}
/**
 * JSON object with empty mandatory credit card attributes
 */
export let dataCreditCardEmpty: any = {
    holderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: ""
}
/**
 * Credit card object 1 as test data set
 */
let creditCard1: CreditCardC = new CreditCardC(dataCreditCard1);
creditCard1.setCreationDate(undefined);
creditCard1.setUpdateDate(undefined);
/**
 * Credit card object 2 as test data set
 */
let creditCard2: CreditCardC = new CreditCardC(dataCreditCard2);
creditCard2.setCreationDate(undefined);
creditCard2.setUpdateDate(undefined);
/**
 * Two credit cards list as test data set
 */
export let twoCreditCards: CreditCardC[] = [creditCard1, creditCard2];
/**
 * One credit card list as test data set
 */
export let oneCreditCard: CreditCardC[] = [creditCard1];

//only copies the 4 main props
/**
 * It copies the 4 mandatory attributes from credit card source to credit card target 
 * @param creditCardTarget credit card source
 * @param creditCardSource credit card target
 */
export function copyPropsTwoCreditCards(creditCardTarget: CreditCardC, creditCardSource: CreditCardC): void {
    creditCardTarget.setCardNumber(creditCardSource.getCardNumber());
    creditCardTarget.setCvv(creditCardSource.getCvv());
    creditCardTarget.setExpirationDate(creditCardSource.getExpirationDate());
    creditCardTarget.setHolderName(creditCardSource.getHolderName());
}

//only compares the 4 main props
/**
 * It checks the 4 mandatory attributes between them both
 * @param dataCreditCard1 credit card 1 to compare
 * @param dataCreditCard2 credit card 1 to compare
 * @returns all attributes are equal
 */
export function comparePropsTwoCreditCards(dataCreditCard1: CreditCardC, dataCreditCard2: CreditCardC): boolean {
    let p1: boolean = dataCreditCard1.getCardNumber() == dataCreditCard2.getCardNumber();
    let p2: boolean = dataCreditCard1.getCvv() == dataCreditCard2.getCvv();
    let p3: boolean = dataCreditCard1.getExpirationDate() == dataCreditCard2.getExpirationDate();
    let p4: boolean = dataCreditCard1.getHolderName() == dataCreditCard2.getHolderName();
    return p1 && p2 && p3 && p4;
}

//VALIDATIONS
/**
 * date form regex MM/YY as validation rule for test MyValidation
 */
let regExpDate: RegExp = new RegExp(/^(0[1-9]|1[0-2])\/([0-9]{2})$/i);
/**
 * 3 digit regex as validation rule, test data set
 */
let regExpCvv: RegExp = new RegExp(/([0-9]{3})/i);
/**
 * Validation object 1 as test data set
 */
let validation1: MyValidation = new MyValidation("required", regExpDate);
/**
 * Validation object 2 as test data set
 */
let validation2: MyValidation = new MyValidation("required", regExpCvv);
/**
 * Validations list as test data set
 */
export let validations: MyValidation[] = [validation1, validation2];
/**
 * Input Texts list to get succeed validations as test data set
 */
export let inputsOk: string[] = ["11/11", "123"];
/**
 * Input Texts list to get fail validations as test data set
 */
export let inputsFail: string[] = ["11311", "12w"];
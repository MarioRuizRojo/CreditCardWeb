import { CreditCardServiceC } from "./CreditCardServiceC";

let creditCardService: CreditCardServiceC;
/**
 * Creates a service to test
 */
beforeAll(function () {
    creditCardService = new CreditCardServiceC();
});

/**
 * It expects serverAddCreditCard call to throw an error because credit card to add is mandatory
 * but undefined
 */
it('void creditCard when serverAddCreditCard', function (): void {
    expect(creditCardService.serverAddCreditCard(undefined)).toEqual(Promise.reject());
});
/**
 * It expects serverDeleteCreditCard call to throw an error because identifier of the credit card
 * to delete is mandatory but undefined
 */
it('void creditCard when serverDeleteCreditCard', function (): void {
    expect(creditCardService.serverDeleteCreditCard(undefined)).toEqual(Promise.reject());
});
/**
 * It expects serverUpdateCreditCard call to throw an error because credit card to update is mandatory
 * but undefined
 */
it('void creditCard when serverUpdateCreditCard', function (): void {
    expect(creditCardService.serverUpdateCreditCard(undefined)).toEqual(Promise.reject());
});
import { CreditCardC } from './CreditCardC';

/**
 * credit card instance for testing
 */
let creditCardC: CreditCardC;

/**
 * It compares two dates and returns true if they are seconds closer
 * @param date1 date 1 to compare
 * @param date2 date 2 to compare
 */
function expectSameAproxDate(date1: Date, date2: Date) {
  expect(date1.getDay()).toBe(date2.getDay());
  expect(date1.getHours()).toBe(date2.getHours());
  expect(date1.getMinutes()).toBe(date2.getMinutes());
}

/**
 * It creates a credit card with test data set
 * only mandatory attributes
 */
beforeEach(function (): void {
  let aux: any = {
    holderName: "holderName",
    cardNumber: "cardNumber",
    expirationDate: "expirationDate",
    cvv: "cvv"
  }
  creditCardC = new CreditCardC(aux);
});

/**
 * It checks if constructor has expected values on its non mandatory attributes
 */
it('constructor doesnt need id, creationDate or updateDate', function (): void {
  let now: Date = new Date();

  expect(creditCardC.getId()).toBe(undefined);
  expectSameAproxDate(creditCardC.getCreationDate(), now);
  expectSameAproxDate(creditCardC.getUpdateDate(), now);
});
/**
 * It expect constructor to throw error if JSON object parameter is empty
 */
it('Error if constructor receives empty objet', function (): void {
  let creation = function (): void {
    let creditCardC2: CreditCardC = new CreditCardC({});
  }
  expect(creation).toThrow(Error);
});
/**
 * It expects constructor to throw error 
 * if parameter holder name of the credit card is undefined
 */
it('Error if constructor receives objet with undefined holderName', function (): void {
  let aux: any = {
    holderName: undefined,
    cardNumber: "cardNumber",
    expirationDate: "expirationDate",
    cvv: "cvv",
  }
  let creation = function (): void {
    let creditCardC2: CreditCardC = new CreditCardC(aux);
  }
  expect(creation).toThrow(Error);
});
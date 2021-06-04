import CreditCardEditor from './CreditCardEditor.svelte';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { Observable, Subject } from 'rxjs';

import { CreditCardC } from './CreditCardC';
import { CreditCardServiceC } from './CreditCardServiceC';
import { dataCreditCardEmpty, twoCreditCards, copyPropsTwoCreditCards, comparePropsTwoCreditCards } from './fixtures/fixtures';

//language support in tests
import { locale, _, addMessages } from 'svelte-i18n';
import en from './en.json';

/**
 * Mocked serverGetCreditCards function to mock returned values
 */
let mockGetListCards: jest.Mock<any, any>;
/**
 * Mocked setNewList function to check if its called
 */
let mockServiceNewList: jest.Mock<any, any>;
/**
 * Mocked serverAddCreditCard function to check if its called
 */
let mockServiceAddCard: jest.Mock<any, any>;
/**
 * Local observable instance creditCardToEdit$ to check
 * if onEditCard in CreditCardEditor is called when creditCardToEdit$ 
 * updates
 */
let creditCardToEdit$: Subject<CreditCardC>;

/**
 * It sets up the language translation engine before running the tests
 */
beforeAll(function (): void {
    addMessages('en', en);
    locale.set('en');
});

/**
 * Mock all service functions
 */
beforeEach(function (): void {
    creditCardToEdit$ = new Subject<CreditCardC>();
    //mocks service new card to edit subscribe function
    const mockEditSubscribe: jest.Mock<any, any> = jest.fn(
        function (): Observable<CreditCardC> {
            return creditCardToEdit$.asObservable();
        }
    );
    CreditCardServiceC.prototype.getCreditCardToEdit = mockEditSubscribe;
    //mocks service new cards list to notify to observers
    mockServiceNewList = jest.fn();
    CreditCardServiceC.prototype.setNewList = mockServiceNewList;
    //mocks service add credit card
    mockServiceAddCard = jest.fn();
    CreditCardServiceC.prototype.serverAddCreditCard = mockServiceAddCard;
    //mocks service get list cards
    mockGetListCards = jest.fn(
        function (): Promise<CreditCardC[]> {
            return new Promise((resolve, reject) => resolve(twoCreditCards));
        }
    );
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
});

/**
 * It expects default values for CreditCardEditor attributes
 */
it('check empty form', function (): void {
    const rendered = render(CreditCardEditor);//empty card form
    expect(rendered).toMatchSnapshot();
});

/**
 * It updates creditCardToEdit$ and expect the first credit card 
 * of the test data set to be rendered in the form
 */
it('check if subscribe triggers the rendering of the new card to edit', function (): void {
    const rendered = render(CreditCardEditor);//empty card form
    creditCardToEdit$.next(twoCreditCards[0]);//fires subscribe with new card to edit
    //rendered has creditCard values of creditCards[0] in its variable creditCard inside the snapshot
    expect(rendered).toMatchSnapshot();
});

/**
 * It clicks submit button and expects serverAddCreditCard to have been called
 */
it('check if submit triggers service Add Credit Card', async function (): Promise<void> {
    const { getByTestId } = render(CreditCardEditor);//empty card form
    const buttonSubmit: HTMLElement = await getByTestId("submit");
    await fireEvent.click(buttonSubmit);
    expect(mockServiceAddCard).toHaveBeenCalled();
});

/**
 * It mocks serverUpdateCreditCard
 * It updates creditCardToEdit$ observable with second credit card 
 * of the test data set
 * It expects serverUpdateCreditCard to have been called with the  
 * second credit card of the test data set when submit button is clicked
 */
it('check if submit triggers service update Credit Card', async function (): Promise<void> {
    let creditCardReceivedByService: CreditCardC = new CreditCardC(dataCreditCardEmpty);
    //mocks service update credit card
    const mockServiceUpdateCard: jest.Mock<any, any> = jest.fn(
        function (creditCard1: CreditCardC): void {
            copyPropsTwoCreditCards(creditCardReceivedByService, creditCard1);
        }
    );
    CreditCardServiceC.prototype.serverUpdateCreditCard = mockServiceUpdateCard;
    const { getByTestId } = render(CreditCardEditor);//empty card form
    creditCardToEdit$.next(twoCreditCards[1]);//fires subscribe with new card to edit
    const buttonSubmit: HTMLElement = await getByTestId("submit");
    await fireEvent.click(buttonSubmit);
    expect(mockServiceUpdateCard).toHaveBeenCalled();
    expect(comparePropsTwoCreditCards(creditCardReceivedByService, twoCreditCards[1])).toBe(true);
});
/**
 * It clicks submit and expects setNewList to have been called
 */
it('check if submit triggers service new cards list to notify to observers', async function (): Promise<void> {
    const { getByTestId } = render(CreditCardEditor);//empty card form
    const buttonSubmit: HTMLElement = await getByTestId("submit");
    await fireEvent.click(buttonSubmit);
    expect(mockServiceNewList).toHaveBeenCalled();
});

/**
 * It types "123" on cvv input, blur it and expect to render a green key icon
 */
it('check if onblur triggers validations and it pass', async function (): Promise<void> {
    const rendered = render(CreditCardEditor);//empty card form
    const inputCvv: HTMLElement = await rendered.findByTestId("cvv");
    userEvent.type(inputCvv, "123");
    await fireEvent.blur(inputCvv);
    expect(rendered).toMatchSnapshot();
});

/**
 * It types "wwww" on cvv input, blur it and expect to render a red key icon 
 * and an error message
 */
it('check if onblur triggers validations and it fails', async function () {
    const rendered = render(CreditCardEditor);//empty card form
    const inputCvv: HTMLElement = await rendered.findByTestId("cvv");
    userEvent.type(inputCvv, "wwww");
    await fireEvent.blur(inputCvv);
    expect(rendered).toMatchSnapshot();
});
import App from '../App.svelte';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { CreditCardC } from '../CreditCardC';
import { CreditCardServiceC } from '../CreditCardServiceC';
import { twoCreditCards } from '../fixtures/fixtures';
import { testing } from '../globals';

//language support
import { _, addMessages } from 'svelte-i18n';
import en from '../en.json';

//form htmlelements
/**
 * form's input text holder name
 */
let inputHolderName: HTMLElement;
/**
 * form's input text card number
 */
let inputCardNumber: HTMLElement;
/**
 * form's input text expiration date
 */
let inputExpDate: HTMLElement;
/**
 * form's input text cvv
 */
let inputCvv: HTMLElement;
/**
 * form's submit button
 */
let buttonSubmit: HTMLElement;
//mocks
/**
 * Manually mocked credit cards list of the service
 */
let mockCreditCards: CreditCardC[] = [];
/**
 * Mocked service function serverAddCreditCard to implement it with mockCreditCards
 */
let mockServiceAddCard: jest.Mock<any, any>;
/**
 * Mocked service function serverDeleteCreditCard to implement it with mockCreditCards
 */
let mockServiceDelete: jest.Mock<any, any>;
/**
 * Mocked service function serverUpdateCreditCard to implement it with mockCreditCards
 */
let mockServiceUpdate: jest.Mock<any, any>;
/**
 * Mocked service function serverGetCreditCards to implement it with mockCreditCards
 */
let mockGetListCards: jest.Mock<any, any>;

/**
 * counter for credit card identifier generation
 */
let idCounter: number = 0;
/**
 * Mock implementation of serverGetCreditCards
 * @returns mocked list
 */
function mockServerGetCreditCards(): Promise<CreditCardC[]> {
    return new Promise((resolve, reject) => resolve(mockCreditCards));
}
/**
 * Mock implementation of serverDeleteCreditCard
 * It deletes the credit card if it is in mocked list
 * @param id identifier of the credit card to delete
 * @returns true if the credit card to delete is in mocked list
 */
function mockServerDeleteCreditCards(id: string): Promise<any> {
    return new Promise(function (resolve, reject): void {
        let result: CreditCardC[] = mockCreditCards.filter(
            function (item: CreditCardC): boolean {
                return item.getId() === id;
            }
        );
        if (result.length > 0) {
            let toDelete: CreditCardC = result[0];
            mockCreditCards.splice(mockCreditCards.indexOf(toDelete), 1);
            resolve(true);
        } else {
            reject(false);
        }
    });
}
/**
 * Mock implementation of serverUpdateCreditCard
 * It updates the credit card if it is in mocked list
 * @param creditCardToUpdate credit card to update
 * @returns true if the credit card to update is in mocked list
 */
function mockServerUpdateCreditCard(creditCardToUpdate: CreditCardC): Promise<any> {
    return new Promise(function (resolve, reject): void {
        let result: CreditCardC[] = mockCreditCards.filter(
            function (item: CreditCardC): boolean {
                return item.getId() === creditCardToUpdate.getId();
            }
        );
        if (result.length > 0) {
            let toUpdate: CreditCardC = result[0];
            mockCreditCards.splice(mockCreditCards.indexOf(toUpdate), 1, creditCardToUpdate);
            resolve(true);
        } else {
            reject(false);
        }
    });
}
/**
 * Mock implementation of serverAddCreditCard
 * It add the credit card to the mocked list and gives it an identifier
 * @param creditCardToSave credit card to add
 * @returns Promise like importantless
 */
function mockSserverAddCreditCard(creditCardToSave: CreditCardC): Promise<any> {
    creditCardToSave.setId("" + idCounter);
    mockCreditCards.push(creditCardToSave);
    idCounter++;
    return new Promise((resolve, reject) => resolve(true));
}
/**
 * It setups the selected language and sets flag testing true
 * to avoid another language setup during App component rendering
 * Mock all service functions
 * It creates an empty array for the mocked list
 */
beforeAll(function (): void {
    //language support
    addMessages('en', en);
    //MOCKs
    //global mock to render App.svelte
    testing.testing = true;
    //server mocks
    mockServiceDelete = jest.fn(mockServerDeleteCreditCards);
    mockServiceUpdate = jest.fn(mockServerUpdateCreditCard);
    mockGetListCards = jest.fn(mockServerGetCreditCards);
    mockServiceAddCard = jest.fn(mockSserverAddCreditCard);
    CreditCardServiceC.prototype.serverDeleteCreditCard = mockServiceDelete;
    CreditCardServiceC.prototype.serverAddCreditCard = mockServiceAddCard;
    CreditCardServiceC.prototype.serverUpdateCreditCard = mockServiceUpdate;
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
    mockCreditCards = [];
});

//user-event library needs to do the cleaning on them
/**
 * It clears all the input fields of the form
 * using user-event library
 */
function clearFormInputs(): void {
    userEvent.clear(inputHolderName);
    userEvent.clear(inputCardNumber);
    userEvent.clear(inputExpDate);
    userEvent.clear(inputCvv);
}
/**
 * It types credit card's data on form's inputs and clicks submit
 * @param creditCard credit card to add
 */
async function addNewCardUsingForm(creditCard: CreditCardC): Promise<void> {
    clearFormInputs();
    //fill form
    userEvent.type(inputHolderName, creditCard.getHolderName());
    userEvent.type(inputCardNumber, creditCard.getCardNumber());
    userEvent.type(inputExpDate, creditCard.getExpirationDate());
    userEvent.type(inputCvv, "" + creditCard.getCvv());
    //add new card to the list
    await fireEvent.click(buttonSubmit);
}

//add 2 cards, add bad fields card, edit second card, delete first card
/**
 * It adds 2 credit cards typing the data
 * It expects mocked list to have 2 cards
 * It types bad data in form's inputs and expects submit button to be disabled
 * It clears the form
 * It click edit on second credit card of the list, type "w" to add to the holder name
 * clicks submit and expects second card in the mocked list to show the changes
 * It clicks delete on first credit card of the list and expects the credit card
 * with an "w" in its holder name to be the only credit card in the mocked list
 */
it('integration test 1', async function (): Promise<void> {
    const { findByTestId } = render(App);
    buttonSubmit = await findByTestId("submit");
    inputHolderName = await findByTestId("inputformHolderName");
    inputCardNumber = await findByTestId("inputformCardNumber");
    inputExpDate = await findByTestId("inputformExpirationDate");
    inputCvv = await findByTestId("cvv");

    //add to cards to the list
    addNewCardUsingForm(twoCreditCards[0]);
    addNewCardUsingForm(twoCreditCards[1]);
    expect(mockCreditCards.length).toBe(2);
    const editButton: HTMLElement = await findByTestId("edit1");
    expect(editButton).toBeInTheDocument();
    //add bad field card
    userEvent.type(inputHolderName, "1");
    userEvent.type(inputCardNumber, "w");
    userEvent.type(inputExpDate, "1234a");
    userEvent.type(inputCvv, "wwww");
    expect(buttonSubmit).toBeDisabled();
    clearFormInputs();

    //edit card in position 2    
    let addedChar: string = "w";
    await fireEvent.click(editButton);
    userEvent.type(inputHolderName, addedChar);
    await fireEvent.click(buttonSubmit);
    //expect holder name of second card in list to be holder name of second card in fixtures plus addedChar (holderName2w)
    expect(mockCreditCards[1].getHolderName()).toBe(twoCreditCards[1].getHolderName() + addedChar);

    //delete first card
    const deleteButton: HTMLElement = await findByTestId("delete0");
    await fireEvent.click(deleteButton);
    expect(mockCreditCards.length).toBe(1);
    let lastCardStanding: CreditCardC = new CreditCardC({
        holderName: twoCreditCards[1].getHolderName() + addedChar,
        cardNumber: twoCreditCards[1].getCardNumber(),
        expirationDate: twoCreditCards[1].getExpirationDate(),
        cvv: twoCreditCards[1].getCvv()
    });
    lastCardStanding.setCreationDate(mockCreditCards[0].getCreationDate());//dont care about dates
    lastCardStanding.setUpdateDate(mockCreditCards[0].getUpdateDate());
    lastCardStanding.setId("1");
    expect(mockCreditCards[0]).toEqual(lastCardStanding);
});
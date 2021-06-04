import CreditCardList from './CreditCardList.svelte';
import { render, fireEvent } from '@testing-library/svelte';
import { Observable, Subject } from 'rxjs';

import type { CreditCardC } from './CreditCardC';
import { CreditCardServiceC } from './CreditCardServiceC';
import { twoCreditCards, oneCreditCard } from './fixtures/fixtures';
import { dummyFunction } from './myUtils';

//language support in tests
import { locale, _, addMessages } from 'svelte-i18n';
import en from './en.json';

/**
 * Mocked returned value from serverGetCreditCards, when called returns Promise like two 
 * credit cards list from test data set
 */
let serviceGivesListTwoCards: Promise<CreditCardC[]> = new Promise((resolve, reject) => resolve(twoCreditCards));
/**
 * Mocked returned value from serverGetCreditCards, when called returns Promise like one 
 * credit card list from test data set
 */
let serviceGivesListOneCard: Promise<CreditCardC[]> = new Promise((resolve, reject) => resolve(oneCreditCard));
/**
 * Mocked serverDeleteCreditCard function to check if its called
 */
let mockServiceDelete: jest.Mock<any, any>;
/**
 * Mocked addCreditCardToEdit function to check if its called
 */
let mockServiceEdit: jest.Mock<any, any>;
/**
 * Mocked serverGetCreditCards function to mock returned values
 */
let mockGetListCards: jest.Mock<any, any>;

/**
 * It sets up the language translation engine before running the tests
 */
beforeAll(function () {
    addMessages('en', en);
    locale.set('en');
});

/**
 * Mock all service functions
 */
beforeEach(function () {
    mockServiceDelete = jest.fn(function (): Promise<boolean> {
        return new Promise((resolve, reject) => resolve(true))
    });
    CreditCardServiceC.prototype.serverDeleteCreditCard = mockServiceDelete;
    mockServiceEdit = jest.fn(dummyFunction);
    CreditCardServiceC.prototype.addCreditCardToEdit = mockServiceEdit;

    //to mock service get Credit Card list function
    //not all tests use it
    mockGetListCards = jest.fn()
        .mockReturnValueOnce(serviceGivesListTwoCards)
        .mockReturnValueOnce(serviceGivesListOneCard);
});

/**
 * It expects default values for CreditCardList attributes
 */
it('check constructor empty card list', function () {
    const rendered = render(CreditCardList);
    expect(rendered).toMatchSnapshot();
});

/**
 * It expects two credit cards list rendered in CreditCardList
 */
it('check constructor 2 cards in list of cards', async function () {
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
    const rendered = render(CreditCardList);
    const deleteButton: HTMLElement = await rendered.findByTestId("delete1");//wait until onMount
    expect(rendered).toMatchSnapshot();
});

/**
 * It expects serverDeleteCreditCard to have been called
 */
it('check if onClick delete triggers a call to service delete', async function () {
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
    const { findByTestId } = render(CreditCardList);
    //this waits until there is a match, so until CreditCardList's onMount
    const deleteButton: HTMLElement = await findByTestId("delete0");
    await fireEvent.click(deleteButton);
    expect(mockServiceDelete).toHaveBeenCalledTimes(1);
});

/**
 * It renders two credit card list and deletes one
 * It expects serverDeleteCreditCard to have been called
 * and one credit card list rendered at the end
 */
it('check if onClick delete removes one credit card from the list of 2 cards', async function () {
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
    const rendered = render(CreditCardList);
    //this waits until there is a match, so until CreditCardList's onMount
    const deleteButton2ndItem: HTMLElement = await rendered.findByTestId("delete1");//delete second
    await fireEvent.click(deleteButton2ndItem);
    expect(rendered).toMatchSnapshot();
});

/**
 * It renders two credit card list and clicks edit on one of them
 * It expects addCreditCardToEdit to have been called with the first
 * credit card of the list as a parameter
 */
it('check if onClick edit triggers a call to service addCreditCardToEdit with first card object', async function () {
    CreditCardServiceC.prototype.serverGetCreditCards = mockGetListCards;
    const rendered = render(CreditCardList);
    //this waits until there is a match, so until CreditCardList's onMount
    const editButtonFirstItem: HTMLElement = await rendered.findByTestId("edit0");
    await fireEvent.click(editButtonFirstItem);
    expect(mockServiceEdit).toHaveBeenLastCalledWith(twoCreditCards[0]);
});

/**
 * It subscribes CreditCardList to local observable instance creditCardList$
 * It updates that instance to one credit card list from test data set
 * It expects one credit card list rendered in CreditCardList
 */
it('check if subscribe triggers the rendering of the new cards list', async function () {
    let creditCardList$ = new Subject<CreditCardC[]>();
    //mocks service new card list subscribe function
    const mockNewListSubscribe: jest.Mock<any, any> = jest.fn(
        function (): Observable<CreditCardC[]> {
            return creditCardList$.asObservable();
        }
    );
    CreditCardServiceC.prototype.getNewList = mockNewListSubscribe;
    const rendered = render(CreditCardList);//empty list
    creditCardList$.next(oneCreditCard);//fires subscribe with new list, fixtures list
    const deleteButton: HTMLElement = await rendered.findByTestId("delete0");//wait until there is new list
    expect(rendered).toMatchSnapshot();
});
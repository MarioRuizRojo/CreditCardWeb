import { Observable, Subject } from 'rxjs';

import { urlAddCreditCard, urlDeleteCreditCard, urlGetCreditCards, urlUpdateCreditCard } from './constants';
import { CreditCardC } from './CreditCardC';

/**
 * Service to make request calls to the server and implement observer pattern
 * to communicate components with each other
 */
export class CreditCardServiceC {
    /**
     * observer pattern
     * to communicate CreditCardEditor with CreditCardList
     * when click in edit button
     */
    private creditCardToEdit$ = new Subject<CreditCardC>();
    /**
     * observer pattern
     * to communicate CreditCardEditor with CreditCardList
     * when click in form's submit button of the CreditCardEditor
     */
    private creditCardList$ = new Subject<CreditCardC[]>();

    //----------SERVER FUNCTIONS----------
    /**
     * Request to the server to add a credit card to the list
     * @param creditCardToSave credit card to add
     * @returns promise of the request process
     */
    public serverAddCreditCard(creditCardToSave: CreditCardC): Promise<any> {
        let promiseJSON: Promise<any>;
        if (creditCardToSave == undefined) {
            promiseJSON = Promise.reject("credit card to save cannot be empty");
        } else {
            promiseJSON = fetch(
                urlAddCreditCard,
                {
                    method: 'POST',
                    body: JSON.stringify(creditCardToSave),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(function (answer): Promise<any> {
                return answer.json();
            });
        }
        return promiseJSON;
    }

    /**
     * Request to the server to get the credit cards list
     * @returns promise of the request process with a credit cards list if it succeeds
     */
    public serverGetCreditCards(): Promise<CreditCardC[]> {
        return new Promise(function (resolve, reject): void {
            fetch(urlGetCreditCards)
            .then(function (answer): Promise<any> {
                return answer.json();
            })
            .then(function (json: any): void {
                try {
                    let creditCardList1: CreditCardC[] = [];
                    let list: any[] = json;
                    list.forEach(function (cardJson: any): void {
                        let creditCard: CreditCardC = new CreditCardC(cardJson);
                        creditCard.setId(cardJson.id);
                        creditCard.setCreationDate(cardJson.creationDate);
                        creditCard.setUpdateDate(cardJson.updateDate);
                        creditCardList1.push(creditCard);
                    });
                    resolve(creditCardList1);
                } catch (error1) {
                    reject(error1);
                }
            })
            .catch((error2: Error) => {
                console.error(error2.message);
                reject(error2);
            });
        });
    }

    /**
     * Request to the server to delete a credit card that is in the list
     * @param id identifier of the credit card to delete
     * @returns promise of the request process
     */
    public serverDeleteCreditCard(id: string): Promise<any> {
        let promiseJSON: Promise<any>;
        if (id == undefined) {
            promiseJSON = Promise.reject("id of credit card to delete cannot be empty");
        } else {
            promiseJSON = fetch(
                urlDeleteCreditCard,
                {
                    method: 'POST',
                    body: JSON.stringify({ id: id }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(function (answer): Promise<any> {
                return answer.json();
            });
        }
        return promiseJSON;
    }

    /**
     * Request to the server to update a credit card that is in the list
     * @param creditCardToUpdate identifier and credit card new data to update
     * @returns promise of the request process
     */
    public serverUpdateCreditCard(creditCardToUpdate: CreditCardC): Promise<any> {
        let promiseJSON: Promise<any>;
        if (creditCardToUpdate == undefined) {
            promiseJSON = Promise.reject("credit card to update cannot be empty");
        }
        else {
            promiseJSON = fetch(
                urlUpdateCreditCard,
                {
                    method: 'POST',
                    body: JSON.stringify(creditCardToUpdate),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(function (answer): Promise<any> {
                return answer.json();
            });
        }
        return promiseJSON;
    }
    //-------RX observer pattern--------
    //----------RXjs FUNCTIONS----------
    //EDIT CARD
    /**
     * It is called from CreditCardList
     * 
     * CreditCardEditor is subscribed to its updates
     * 
     * When it updates CreditCardEditor
     * enter edit mode and fill form with the data of the credit 
     * card to edit
     * @param creditCard credit card to edit
     */
    public addCreditCardToEdit(creditCard: CreditCardC) {
        this.creditCardToEdit$.next(creditCard);
    }

    /**
     * CreditCardEditor uses it to subscribe to updates on creditCardToEdit$
     */
    public getCreditCardToEdit(): Observable<CreditCardC> {
        return this.creditCardToEdit$.asObservable();
    }
    //UPDATE LIST
    /**
     * It is called from CreditCardEditor when submit button is clicked
     * 
     * CreditCardList is subscribed to its updates
     * 
     * When it updates CreditCardList renders again the credit cards list
     * with the new credit cards list data
     * @param newCreditCardList new credit cards list to render
     */
    public setNewList(newCreditCardList: CreditCardC[]) {
        this.creditCardList$.next(newCreditCardList);
    }

    /**
     * CreditCardList uses it to subscribe to updates on creditCardList$
     */
    public getNewList(): Observable<CreditCardC[]> {
        return this.creditCardList$.asObservable();
    }
}



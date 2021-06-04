/**
 * It represents credit card's data
 */
export class CreditCardC {
    /**
     * identifier of the credit card
     */
    private id?: string;
    /**
     * holder name of the credit card
     * it is mandatory
     */
    private holderName: string;
    /**
     * card number of the credit card
     * it is mandatory
     */
    private cardNumber: string;
    /**
     * expiration date of the credit card
     * it is mandatory
     */
    private expirationDate: string;
    /**
     * cvv of the credit card
     * it is mandatory
     */
    private cvv: number;
    /**
     * creation date of the credit card
     */
    private creationDate: Date;
    /**
     * update date of the credit card
     */
    private updateDate: Date;

    /**
     * It throws error if the JSON object is undefined or some of its mandatory properties are undefined
     * @param creditCard JSON object to check
     */
    private checkAllNeededPropsObjectCreditCard(creditCard: any): void {
        if (creditCard == undefined) throw new Error("Undefined object cannot be CreditCard");
        if (creditCard.holderName == undefined) throw new Error("Object without holderName cannot be CreditCard");
        if (creditCard.cardNumber == undefined) throw new Error("Object without cardNumber cannot be CreditCard");
        if (creditCard.expirationDate == undefined) throw new Error("Object without expirationDate cannot be CreditCard");
        if (creditCard.cvv == undefined) throw new Error("Object without cvv cannot be CreditCard");
    }
    /**
     * Checks if JSON object has mandatory properties and sets the creation 
     * and update dates to now
     * @param creditCard JSON object
     */
    constructor(creditCard: any) {
        this.checkAllNeededPropsObjectCreditCard(creditCard);
        this.holderName = creditCard.holderName;
        this.cardNumber = creditCard.cardNumber;
        this.expirationDate = creditCard.expirationDate;
        this.cvv = creditCard.cvv;
        this.creationDate = new Date();
        this.updateDate = new Date();
    }

    /**
     * 
     * @returns identifier of the credit card
     */
    public getId(): string {
        return this.id;
    }

    /**
     * 
     * @param id identifier of the credit card to set
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * 
     * @returns holder name of the credit card
     */
    public getHolderName(): string {
        return this.holderName;
    }

    /**
     * 
     * @param holderName holder name of the credit card to set
     */
    public setHolderName(holderName: string): void {
        this.holderName = holderName;
    }

    /**
     * 
     * @returns card number
     */
    public getCardNumber(): string {
        return this.cardNumber;
    }

    /**
     * 
     * @param cardNumber card number to set
     */
    public setCardNumber(cardNumber: string): void {
        this.cardNumber = cardNumber;
    }

    /**
     * 
     * @returns expiration date of the credit card
     */
    public getExpirationDate(): string {
        return this.expirationDate;
    }

    /**
     * 
     * @param expirationDate expiration date to set
     */
    public setExpirationDate(expirationDate: string): void {
        this.expirationDate = expirationDate;
    }

    /**
     * 
     * @returns cvv of the credit card
     */
    public getCvv(): number {
        return this.cvv;
    }

    /**
     * 
     * @param cvv cvv of the credit card to set
     */
    public setCvv(cvv: number): void {
        this.cvv = cvv;
    }

    /**
     * 
     * @returns creation date of the credit card
     */
    public getCreationDate(): Date {
        return this.creationDate;
    }

    /**
     * 
     * @param creationDate reation date to set
     */
    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }

    /**
     * 
     * @returns update date of the credit card
     */
    public getUpdateDate(): Date {
        return this.updateDate;
    }

    /**
     * 
     * @param updateDate update date to set
     */
    public setUpdateDate(updateDate: Date): void {
        this.updateDate = updateDate;
    }
}

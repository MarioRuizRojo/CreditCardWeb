package com.business;

import java.util.List;

import com.CreditCard;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 *	Bussines layer abstraction to expose methods to the controller
 *	It offers operations to manage the credit card list
 *
 */
public interface CreditCardDummyService {
	/**
	 * it adds one credit card to the list
	 * @param creditCard credit card to add to the list
	 */
	public void addCreditCard(CreditCard creditCard);
	/**
	 * it updates one credit card that is already in the list
	 * @param creditCard credit card to update
	 * @return true if card is inside the list
	 */
	public boolean updateCreditCard(CreditCard creditCard);
	/**
	 * it deletes one credit card that is already in the list
	 * @param id credit card to delete
	 * @return true if card is inside the list
	 */
	public boolean deleteCreditCard(String id);	
	/**
	 * it returns the list of credit cards
	 * @return credit card list
	 */
	public List<CreditCard> getCreditCards();
}

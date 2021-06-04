package com.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.CreditCard;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * Bussines layer to manage a list of credit cards
 * It offers operations to manage the credit card list
 * <br/>
 *	<strong>IMPORTANT</strong>: this is not a real world business layer class implementation
 *  because it doesn't use any data source (database or external service)
 */
@Component
public class CreditCardDummyServiceImpl implements CreditCardDummyService {
	private List<CreditCard> list = new ArrayList<CreditCard>();
	private int idInteger = 0;
	
	/**
	 * It updates only the 4 mandatory parameters of CreditCard class
	 * and changes the update date to now
	 * @param toUpdate credit card to update
	 * @param model object with the changes to put on the credit card
	 */
	private void update(CreditCard toUpdate, CreditCard model) {
		toUpdate.setCardNumber(model.getCardNumber());
		toUpdate.setCvv(model.getCvv());
		toUpdate.setExpirationDate(model.getExpirationDate());
		toUpdate.setHolderName(model.getHolderName());
		toUpdate.setUpdateDate(new Date());
	}
	
	/**
	 * 
	 * it adds one credit card to the list
	 * <br/>
	 * it generates an id following a sequence, 
	 * 	handmade, not real world application way
	 * @param creditCard credit card to add to the list
	 * 
	 */
	@Override
	public void addCreditCard(CreditCard creditCard) {
		creditCard.setCreationDate(new Date());
		creditCard.setId(""+idInteger);
		list.add(creditCard);
		idInteger++;		
	}

	
	/**
	 * it updates one credit card that is already in the list
	 * @param creditCard credit card to update
	 * @return true if there is a credit card in the list with the same id as creditCard
	 */
	@Override
	public boolean updateCreditCard(CreditCard creditCard) {
		CreditCard creditCardToUpdate = list.stream()
				  .filter(creditCard2 -> (creditCard.getId()).equals(creditCard2.getId()))
				  .findAny()
				  .orElse(null);
		if(creditCardToUpdate!=null) {
			update(creditCardToUpdate,creditCard);
			return true;
		}	
		return false;
	}

	/**
	 * it deletes one credit card that is already in the list
	 * @param id credit card to delete
	 * @return true if there is a credit card in the list with the same id as id parameter
	 */
	@Override
	public boolean deleteCreditCard(String id) {
		CreditCard creditCardToDelete = list.stream()
				  .filter(creditCard -> id.equals(creditCard.getId()))
				  .findAny()
				  .orElse(null);
		if(creditCardToDelete!=null) {
			list.remove(creditCardToDelete);
			return true;
		}
		return false;
	}

	/**
	 * it returns the list of credit cards
	 * @return credit card list
	 */
	@Override
	public List<CreditCard> getCreditCards() {
		return list;
	}
	
}

package com;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.FieldError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.business.CreditCardDummyServiceImpl;

import javax.validation.Valid;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * JSON REST controller that serves to the client the management operations 
 * of the credit card list from the business layer 
 * <br/>
 * It validates JSON parameters and returns BAD_REQUEST(400) http response 
 * if validation fails
 * 
 */
@RestController
public class CreditCardController {
	@Autowired
	CreditCardDummyServiceImpl creditCardDummyService;
	
	/**
	 * GET request handler that returns he list of credit cards
	 * @return JSON list of credit cards
	 */
	@RequestMapping("/getCreditCards")
	public List<CreditCard> getCreditCards() {	
		return creditCardDummyService.getCreditCards();
	}
	
	/**
	 * POST request handler that adds one credit card to the list of credit cards
	 * @param creditCard credit card to add
	 * @return JSON response to confirm operation success
	 */
	@RequestMapping("/addCreditCard")
	public Response addCreditCard(@Valid @RequestBody CreditCard creditCard) {
		creditCardDummyService.addCreditCard(creditCard);
		return new Response(true);
	}
	
	/**
	 * POST request handler that deletes one credit card that is already
	 * in the list of credit cards
	 * @param id identifier of the credit card to delete
	 * @return JSON response to confirm operation success
	 */
	@RequestMapping("/deleteCreditCard")
	public Response deleteCreditCard(@Valid @RequestBody Id id) {		
		return new Response(
				creditCardDummyService.deleteCreditCard(id.getId())
				);
	}
	
	/**
	 * POST request handler that updates one credit card that is already 
	 * in the list of credit cards
	 * @param creditCard credit card to add
	 * @return JSON response to confirm operation success
	 */
	@RequestMapping("/updateCreditCard")
	public Response updateCreditCard(@Valid @RequestBody CreditCard creditCard) {			
		return new Response(
				creditCardDummyService.updateCreditCard(creditCard)
				);
	}	
	
	/**
	 * Exception's validator catcher, it sends http 400 to the client if validation fails
	 * 
	 * @param ex exception raised by the validator
	 * @return JSON response with a dictionary containing the CreditCard class
	 * attribute and its error 
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(
	  MethodArgumentNotValidException ex) {
	    Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.put(fieldName, errorMessage);
	    });
	    return errors;
	}
}

package com;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * Identifier of Credit Card
 * Wrapper class to be used as JSON input in REST calls in the controller 
 * 
 */
public class Id {
	/**
	 * Identifier of CreditCard class {@link CreditCard#id}
	 */
	private String id;

	/**
	 * 
	 * @return identifier
	 */
	public String getId() {
		return id;
	}

	/**
	 * 
	 * @param id to set identifier
	 */
	public void setId(String id) {
		this.id = id;
	}	
}

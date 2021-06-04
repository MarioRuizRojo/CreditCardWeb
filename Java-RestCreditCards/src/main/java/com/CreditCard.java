package com;

import java.util.Date;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Pattern;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * Credit card information
 * <br/>
 * CreditCard class has mandatory attributes:
 * holderName, cardNumber, expirationDate and cvv
 * <br/>
 * holderName only accepts letters
 * expirationDate must follow format MM/YY
 * cardNumber must have 16 digits
 * cvv must have 3 digits
 * 
 */
public class CreditCard {
	private String id;
	/**
	 * holderName only accepts letters
	 */
	@Pattern(regexp = "([a-zA-Z]+)")
    private String holderName;
	/**
	 * cardNumber must have 16 digits
	 */
    @Digits(fraction = 0, integer = 16)
    private String cardNumber;
    /**
     * expirationDate must follow format MM/YY
     */
    @Pattern(regexp = "^(0[1-9]|1[0-2])\\/([0-9]{2})$")
    private String expirationDate;
    /**
     * cvv must have 3 digits
     */
    @Digits(fraction = 0, integer = 3)
    private Integer cvv;    
    /**
     * Date of the creation of the object instance
     */
    private Date creationDate;
    /**
     * Date of the update of the object instance
     */
    private Date updateDate;
    
    /**
     * Mandatory params of the class
     * It sets now as creation date and update date
     * @param holdNam holder name of credit card
     * @param caNum card number of credit card
     * @param expirDat expiration date of credit card
     * @param cv cvv name of credit card
     */
	public CreditCard(String holdNam, String caNum, String expirDat, Integer cv) {
		holderName = holdNam;
		cardNumber = caNum;
		expirationDate = expirDat;
		cvv=cv;
		creationDate = new Date();
		updateDate = new Date();
	}
	/**
	 * 
	 * @return identifier
	 */
	public String getId() {
		return id;
	}
	/**
	 * 
	 * @param id identifier to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 
	 * @return holder name of credit card
	 */
	public String getHolderName() {
		return holderName;
	}
	/**
	 * 
	 * @param holderName to set holder name of credit card
	 */
	public void setHolderName(String holderName) {
		this.holderName = holderName;
	}
	/**
	 * 
	 * @return credit card number
	 */
	public String getCardNumber() {
		return cardNumber;
	}
	/**
	 * 
	 * @param cardNumber to set credit card number
	 */
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	/**
	 * 
	 * @return expiration date of credit card
	 */
	public String getExpirationDate() {
		return expirationDate;
	}
	/**
	 * 
	 * @param expirationDate to set expiration date of credit card
	 */
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	/**
	 * 
	 * @return cvv of credit card
	 */
	public Integer getCvv() {
		return cvv;
	}
	/**
	 * 
	 * @param cvv to set cvv of credit card
	 */
	public void setCvv(Integer cvv) {
		this.cvv = cvv;
	}
	/**
	 * 
	 * @return date of creation of the credit card
	 */
	public Date getCreationDate() {
		return creationDate;
	}
	/**
	 * 
	 * @param creationDate to set date of creation of the credit card
	 */
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	/**
	 * 
	 * @return date of update of the credit card
	 */
	public Date getUpdateDate() {
		return updateDate;
	}
	/**
	 * 
	 * @param updateDate to set date of update of the credit card
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
}

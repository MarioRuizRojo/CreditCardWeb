package com;

import static org.junit.jupiter.api.Assertions.*;

import org.json.JSONObject;
import org.json.JSONArray;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * Integration test
 */
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class RestCreditCardsApplicationTests {

	@Autowired
	TestRestTemplate restTemplate;
	
	/**
	 * 
	 * this test run steps:
	 * <br/>
	 * add credit card to the list
	 * <br/>
	 * update that credit card with new holder name
	 * <br/>
	 * get list of credit cards 
	 * <br/>
 	 * it expects a list with length 1
 	 * <br/>
	 * it expects that card inside the list to have new holder name updated
	 * <br/>
	 * delete that credit card
	 * <br/>
	 * get list of credit cards 
	 * <br/>
	 * it expects 0 length list
	 * 
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void fourFunctionsTogether() throws Exception {
		CreditCard creditCard = new CreditCard("holderName","0987654321654321","11/11",123);
		
		String expectedJsonCardUpdated = "{\"id\":\"0\",\"holderName\":\"testing\",\"cardNumber\":\"0987654321654321\",\"expirationDate\":\"11/11\",\"cvv\":123}";
		String expectedJsonResponse = "{itWorkedOk:true}";
		
		String result = restTemplate.postForObject("/addCreditCard", creditCard, String.class, MediaType.APPLICATION_JSON);
		JSONAssert.assertEquals(expectedJsonResponse, new JSONObject(result), false);

		creditCard.setId("0");
		creditCard.setHolderName("testing");
		result = restTemplate.postForObject("/updateCreditCard", creditCard, String.class, MediaType.APPLICATION_JSON);
		JSONAssert.assertEquals(expectedJsonResponse, new JSONObject(result), false);
		
		result = restTemplate.getForObject("/getCreditCards", String.class, MediaType.APPLICATION_JSON);
		JSONArray list = new JSONArray(result);
		assertEquals(list.length(), 1);
		
		JSONObject first = (JSONObject)list.get(0);
		JSONAssert.assertEquals(expectedJsonCardUpdated, first, false);
		
		Id id = new Id();
		id.setId("0");
		result = restTemplate.postForObject("/deleteCreditCard", id, String.class, MediaType.APPLICATION_JSON);
		JSONAssert.assertEquals(expectedJsonResponse, new JSONObject(result), false);		
		
		result = restTemplate.getForObject("/getCreditCards", String.class, MediaType.APPLICATION_JSON);
		list = new JSONArray(result);
		assertEquals(list.length(), 0);
	}

}

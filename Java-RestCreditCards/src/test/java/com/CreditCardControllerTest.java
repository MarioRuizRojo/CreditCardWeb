package com;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.business.CreditCardDummyServiceImpl;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * it tests getCreditCards and addCreditCard
 * also it tests deleteCreditCard and updateCreditCard in both scenarios, success and fail
 *
 */
@WebMvcTest(value=CreditCardController.class)
public class CreditCardControllerTest {
	//for delete tests
	private final String stringJsonRequest = "{\"id\":0}";
	//for update tests
	private final String stringJsonCardRequestWithId = 
			"{\"id\":\"1\",\"holderName\":\"holderName\",\"cardNumber\":\"0987654321654321\",\"expirationDate\":\"11/11\",\"cvv\":\"123\"}";
	
	@Autowired
	private MockMvc mockMvc;
	
	/**
	 * Mocked business layer service
	 */
	@MockBean
	private CreditCardDummyServiceImpl creditCardDummyService;
	
	/**
	 * getCreditCards test expects http response 200 and JSON list with two cards
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void getCreditCards_basic() throws Exception{
		List<CreditCard> toReturn =  new ArrayList<CreditCard>();
		CreditCard creditCard0 = new CreditCard("holderName","0987654321654321","11/11",123);
		CreditCard creditCard1 = new CreditCard("holderName2","0987654321654321","01/01",321);
		creditCard0.setCreationDate(null);//dont care about dates
		creditCard1.setCreationDate(null);//dont care about dates
		creditCard0.setUpdateDate(null);//dont care about dates
		creditCard1.setUpdateDate(null);//dont care about dates
		toReturn.add(creditCard0);
		toReturn.add(creditCard1);
		String expectedJsonItems = 
				"[{\"id\":null,\"holderName\":\"holderName\",\"cardNumber\":\"0987654321654321\",\"expirationDate\":\"11/11\",\"cvv\":123,\"creationDate\":null,\"updateDate\":null},{\"id\":null,\"holderName\":\"holderName2\",\"cardNumber\":\"0987654321654321\",\"expirationDate\":\"01/01\",\"cvv\":321,\"creationDate\":null,\"updateDate\":null}]";		
		RequestBuilder request = MockMvcRequestBuilders.
				get("/getCreditCards").accept(MediaType.APPLICATION_JSON);
		
		when(creditCardDummyService.getCreditCards()).thenReturn(toReturn);
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonItems)).andReturn();
	}
	
	/**
	 * addCreditCard test expects http response 200 and JSON response with itWorkedOk=true
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void addCreditCard_basic() throws Exception{
		String stringJsonCardRequest = 
				"{\"holderName\":\"holderName\",\"cardNumber\":\"0987654321654321\",\"expirationDate\":\"11/11\",\"cvv\":\"123\"}";
		String expectedJsonResponse = "{itWorkedOk:true}";
		RequestBuilder request = MockMvcRequestBuilders.
				post("/addCreditCard").contentType(MediaType.APPLICATION_JSON).content(stringJsonCardRequest).accept(MediaType.APPLICATION_JSON);
		
		Mockito.doNothing()
	       .when(creditCardDummyService)
	       .addCreditCard(Mockito.any(CreditCard.class));
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonResponse)).andReturn();
	}
	
	/**
	 * deleteCreditCard test expects http response 200 and JSON response with itWorkedOk=true
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void deleteCreditCard_basic() throws Exception{
		String expectedJsonResponse = "{itWorkedOk:true}";
		RequestBuilder request = MockMvcRequestBuilders.
				post("/deleteCreditCard").contentType(MediaType.APPLICATION_JSON).content(stringJsonRequest).accept(MediaType.APPLICATION_JSON);
		
		Mockito.doReturn(true)
	       .when(creditCardDummyService)
	       .deleteCreditCard(Mockito.any(String.class));
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonResponse)).andReturn();
	}
	
	/**
	 * updateCreditCard test expects http response 200 and JSON response with itWorkedOk=true
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void updateCreditCard_basic() throws Exception{
		String expectedJsonResponse = "{itWorkedOk:true}";
		RequestBuilder request = MockMvcRequestBuilders.
				post("/updateCreditCard").contentType(MediaType.APPLICATION_JSON).content(stringJsonCardRequestWithId).accept(MediaType.APPLICATION_JSON);
		
		Mockito.doReturn(true)
	       .when(creditCardDummyService)
	       .updateCreditCard(Mockito.any(CreditCard.class));
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonResponse)).andReturn();
	}
	
	/**
	 * deleteCreditCard test expects http response 200 and JSON response with itWorkedOk=false
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void deleteCreditCard_fail() throws Exception{		
		String expectedJsonResponse = "{itWorkedOk:false}";
		RequestBuilder request = MockMvcRequestBuilders.
				post("/deleteCreditCard").contentType(MediaType.APPLICATION_JSON).content(stringJsonRequest).accept(MediaType.APPLICATION_JSON);
		
		Mockito.doReturn(false)
	       .when(creditCardDummyService)
	       .deleteCreditCard(Mockito.any(String.class));
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonResponse)).andReturn();
	}
	
	/**
	 * updateCreditCard test expects http response 200 and JSON response with itWorkedOk=false
	 * @throws Exception unexpected exception running the test
	 */
	@Test
	public void updateCreditCard_fail() throws Exception{		
		String expectedJsonResponse = "{itWorkedOk:false}";
		RequestBuilder request = MockMvcRequestBuilders.
				post("/updateCreditCard").contentType(MediaType.APPLICATION_JSON).content(stringJsonCardRequestWithId).accept(MediaType.APPLICATION_JSON);
		
		Mockito.doReturn(false)
	       .when(creditCardDummyService)
	       .updateCreditCard(Mockito.any(CreditCard.class));
		
		mockMvc.perform(request)
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().json(expectedJsonResponse)).andReturn();
	}

}

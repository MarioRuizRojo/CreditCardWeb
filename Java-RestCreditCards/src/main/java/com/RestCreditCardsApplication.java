package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * Spring Boot server application written in Java
 * <br/>
 * It serves compiled ts-sveltecreditcard project as static content 
 * in Public folder to the client
 * <br/>
 * It offers management of a list of credit cards through a REST JSON service
 * 
 */
@SpringBootApplication
public class RestCreditCardsApplication {

	/**
	 * Spring Boot default application runner
	 * @param args regular java args
	 */
	public static void main(String[] args) {
		SpringApplication.run(RestCreditCardsApplication.class, args);
	}

}

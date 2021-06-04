package com;

/**
 * @author Mario Ruiz Rojo
 * <br/>
 * It is the confirmation of the operation requested to the server
 * <br/>
 * Response from the server to the client in JSON format
 * it maybe success or fail
 *
 */
public class Response {
	/**
	 * true = Success
	 * false = Fail
	 */
	private Boolean itWorkedOk;
	
	/**
	 * 
	 * @param iWok to set succes or fail
	 */
	public Response(boolean iWok) {
		itWorkedOk=iWok;
	}

	/**
	 * 
	 * @return itWorkedOk show if it succeed or failed
	 */
	public Boolean getItWorkedOk() {
		return itWorkedOk;
	}

	/**
	 * 
	 * @param itWorkedOk to set success or fail
	 */
	public void setItWorkedOk(Boolean itWorkedOk) {
		this.itWorkedOk = itWorkedOk;
	}

}

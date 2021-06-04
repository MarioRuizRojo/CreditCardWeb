import { CreditCardServiceC } from "./CreditCardServiceC";

/**
 * Language selected by the user
 */
export let lang: any = { sel: "en" };
/**
 * Service to make request calls to the server and implement observer pattern
 * to communicate components with each other
 */
export let creditCardServiceC: CreditCardServiceC = new CreditCardServiceC();

/**
 * Testing flag to avoid loading twice the language library
 */
export let testing: any = { testing: false };
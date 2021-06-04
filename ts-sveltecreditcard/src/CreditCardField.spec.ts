import CreditCardField from './CreditCardField.svelte';
import { render, fireEvent } from '@testing-library/svelte';

/**
 * Prefix of testid attribute for the input element
 */
const inputPrefix: string = "input";
/**
 * Prefix of testid attribute for the error div element
 */
const errorDivPrefix: string = "errorDiv";

/**
 * Properties to render the component as test data set
 */
let options: any = {
  fieldName: "1", filedIconClass: "iconclass", fieldPlaceHolder: "placeHolder", fieldValue: "fieldValue",
  fieldError: "", fieldBlur: undefined
};

/**
 * it expects default values for ValidatorCreditCardEditor attributes
 */
it('check constructor', function (): void {
  const rendered = render(CreditCardField, options);
  expect(rendered).toMatchSnapshot();
});

/**
 * It mocks the handle onblur function to see if it is called
 * It fires user blur on the input
 * It expects the mock function to have been called
 */
it('check onblur', async function (): Promise<void> {
  let handleBlur: jest.Mock<any, any> = jest.fn();
  options.fieldBlur = handleBlur;
  const { getByTestId } = render(CreditCardField, options);
  const input: HTMLElement = getByTestId(inputPrefix + "1");
  await fireEvent.blur(input);
  expect(handleBlur).toHaveBeenCalledTimes(1);
});

/**
 * It sets fieldError property to a not empty string value
 * It expects error div element to be rendered
 */
it('check errorDiv in constructor', function (): void {
  options.fieldError = "it is needed";
  options.fieldBlur = undefined;
  options.fieldName = "2";
  const { getByTestId } = render(CreditCardField, options);
  const errorDiv: HTMLElement = getByTestId(errorDivPrefix + "2");
  expect(errorDiv).toBeInTheDocument();
});

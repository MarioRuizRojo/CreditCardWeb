import MyDropDown from './MyDropDown.svelte';
import { render, fireEvent } from '@testing-library/svelte';

import { MyDropDownOption } from './MyDropDownOption';
import { dummyFunction } from './myUtils';
/**
 * Mocked function to execute when option clicked
 */
let mockHandl = jest.fn();
/**
 * Option 1 as test data set
 */
let dropDownOption1: MyDropDownOption = new MyDropDownOption(dummyFunction, "Option 1", "flag flag-uk");
/**
 * Option 2 as test data set
 */
let dropDownOption2: MyDropDownOption = new MyDropDownOption(mockHandl, "Option 2", "flag flag-es");
/**
 * options list as test data set
 */
let dropDownOptions: MyDropDownOption[] = [dropDownOption1, dropDownOption2];
let props: any = {
    dropDownOptions: dropDownOptions,
    mainCaption: "main text caption display"
};

/**
 * It expects test data set values for MyDropDown attributes
 * and snapshot of no selected option in MyDropDown
 */
it('check constructor', function (): void {
    const rendered = render(MyDropDown, props);
    expect(rendered).toMatchSnapshot();
});

/**
 * It expects mocked handler click function to be called when user click the option
 * and snapshot of that option selected in MyDropDown
 */
it('check handler click function', async function (): Promise<void> {
    const rendered = render(MyDropDown, props);
    const mainButton = await rendered.findByTestId("mainbuttondropdown");
    await fireEvent.click(mainButton);
    const option1Button = await rendered.findByTestId("option1");
    await fireEvent.click(option1Button);
    expect(mockHandl).toHaveBeenCalled();
    expect(rendered).toMatchSnapshot();
});
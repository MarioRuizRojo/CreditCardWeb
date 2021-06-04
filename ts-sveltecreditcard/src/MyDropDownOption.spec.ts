import { MyDropDownOption } from "./MyDropDownOption";
import { dummyFunction } from "./myUtils";

/**
 * option to test
 */
let myDropDownOption: MyDropDownOption;
/**
 * text caption as test data set
 */
let txtCaption: string = "text to display";
/**
 * css class of icon flag as test data set
 */
let cssClass: string = "my css class";
/**
 * It expects the constructor call to throw an error because function to execute when click is mandatory
 * but undefined
 */
it('constructor without mandatory handlerClickFunction', function (): void {
    let creation = function (): void {
        myDropDownOption = new MyDropDownOption(undefined, txtCaption, cssClass);
    }
    expect(creation).toThrowError();
});
/**
 * It expects the constructor call to throw an error because text to show in option's button is mandatory
 * but undefined
 */
it('constructor without mandatory captionTextDisplay', function (): void {
    let creation = function (): void {
        myDropDownOption = new MyDropDownOption(dummyFunction, undefined, cssClass);
    }
    expect(creation).toThrowError();
});
/**
 * It expects the constructor call to throw an error because css class of flag icon is mandatory
 * but undefined
 */
it('constructor without mandatory cssClassString', function (): void {
    let creation = function (): void {
        myDropDownOption = new MyDropDownOption(dummyFunction, txtCaption, undefined);
    }
    expect(creation).toThrowError();
});
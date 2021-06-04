/**
 * Option of the dropdown component
 */
export class MyDropDownOption {
    /**
     * Function to execute if option clicked
     */
    private handleClick: () => void;
    /**
     * Text to show in option's button
     */
    private text: string;
    /**
     * Css class of flag icon
     */
    private cssClass: string;

    /**
     * It throws error if Function to execute is undefined
     * It throws error if Text to show is undefined
     * It throws error if Css class is undefined
     * @param handCl Function to execute when click
     * @param txt Text to show in button
     * @param csscl Css class of flag icon
     */
    private checkAllNeededPropsCreateMyDropDownOption(handCl: () => void, txt: string, csscl: string): void {
        if (handCl == undefined || handCl == null) throw new Error("without handlerClickFunction cannot create MyDropDownOption");
        if (txt == null || txt == undefined) throw new Error("without captionTextDisplay cannot create MyDropDownOption");
        if (csscl == null || csscl == undefined) throw new Error("without cssClassString cannot create MyDropDownOption");
    }

    /**
     * It checks all parameters are not undefined and creates the object
     * @param handCl Function to execute when click
     * @param txt Text to show in button
     * @param csscl Css class of flag icon
     */
    constructor(handCl: () => void, txt: string, csscl: string) {
        this.checkAllNeededPropsCreateMyDropDownOption(handCl, txt, csscl);
        this.handleClick = handCl;
        this.text = txt;
        this.cssClass = csscl;
    }

    /**
     * 
     * @returns Function to execute if option clicked
     */
    public getHandleClick(): () => void {
        return this.handleClick;
    }

    /**
     * 
     * @param handleclick Function to execute to set
     */
    public setHandleClick(handleclick: () => void): void {
        this.handleClick = handleclick;
    }

    /**
     * 
     * @returns Text to show in option's button
     */
    public getText(): string {
        return this.text;
    }

    /**
     * 
     * @param text Text displayed to set
     */
    public setText(text: string): void {
        this.text = text;
    }

    /**
     * 
     * @returns Css class of flag icon
     */
    public getCssClass(): string {
        return this.cssClass;
    }

    /**
     * 
     * @param cssClass Css class of flag icon to set
     */
    public setCssClass(cssClass: string): void {
        this.cssClass = cssClass;
    }
}
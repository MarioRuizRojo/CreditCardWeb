import { iconClassBase, iconClassGreen, iconClassRed } from "./constants";

/**
 * It returns red color clases if the validation fails and green ones if it succeeds
 * @param passed validation status
 * @param iconClassX css base class of icon
 * @returns css classes of icon
 */
export function iconSuccedOrFailed(passed: boolean, iconClassX: string): string {
    if (passed) {
        return iconClassBase + iconClassX + iconClassGreen;
    }
    else {
        return iconClassBase + iconClassX + iconClassRed;
    }
}

/**
 * Very useful dummy function that has no parameters and does nothing
 */
export function dummyFunction(): void {
    //do nothing
}
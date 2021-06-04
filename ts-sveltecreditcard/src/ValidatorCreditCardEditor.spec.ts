import ValidatorCreditCardEditor from './ValidatorCreditCardEditor.svelte';
import { render } from '@testing-library/svelte';

//language support in tests
import { locale, _, addMessages } from 'svelte-i18n';
import en from './en.json';
/**
 * It sets up the language translation engine before running the tests
 */
beforeAll(function (): void {
    addMessages('en', en);
    locale.set('en');
});

/**
 * it expects default values for ValidatorCreditCardEditor attributes
 */
it('check constructor', function (): void {
    const rendered = render(ValidatorCreditCardEditor);
    expect(rendered).toMatchSnapshot();
});

<script lang="ts">
  import { _ } from "svelte-i18n";

  import { MyValidator } from "./MyValidator";
  import { MyValidation } from "./MyValidation";

  /**
   * MyValidator instance to validate all fields in CreditCardEditor svelte component
   */
  export let validator: MyValidator;

  /**
   * MyValidation list instances that define the rule and error message for each field in CreditCardEditor svelte component
   */
  let validations: MyValidation[];

  /**
   * validation error message required
   */
  let errorRequired: string = $_("required");
  /**
   * validation error message for only letters rule
   */
  let errorOnlyLetters: string = $_("onlyletters");
  /**
   * validation error message for 16 digits rule
   */
  let error16dig: string = $_("should16dig");
  /**
   * validation error message for date format rule
   */
  let errorDateForm: string = $_("shoulddateform");
  /**
   * validation error message for 3 digits rule
   */
  let error3dig: string = $_("should3dig");

  /**
   * it creates the validations with the error messages in the selected language
   */
  function updateLangValidations(): void {
    validations = Array(4);
    validations[0] = new MyValidation(
      errorOnlyLetters,
      new RegExp(/([a-zA-Z]+)/i)
    );
    validations[1] = new MyValidation(error16dig, new RegExp(/([0-9]{16})/i));
    validations[2] = new MyValidation(
      errorDateForm,
      new RegExp(/^(0[1-9]|1[0-2])\/([0-9]{2})$/i)
    );
    validations[3] = new MyValidation(error3dig, new RegExp(/([0-9]{3})/i));
    validator = new MyValidator(validations, errorRequired);
  }

  //error messages update when lang changes
  $: {
    errorRequired = $_("required");
    errorOnlyLetters = $_("onlyletters");
    error16dig = $_("should16dig");
    errorDateForm = $_("shoulddateform");
    error3dig = $_("should3dig");
    updateLangValidations();
  }

  updateLangValidations();
  validator = new MyValidator(validations, errorRequired);
</script>

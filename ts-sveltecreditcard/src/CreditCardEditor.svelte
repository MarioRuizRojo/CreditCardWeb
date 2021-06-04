<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  
  import {
    iconClassBase,
    iconClassCalendar,
    iconClassCircle,
    iconClassCreditCard,
    iconClassKey,
  } from "./constants";
  import { CreditCardC } from "./CreditCardC";
  import CreditCardField from "./CreditCardField.svelte";
  import { iconSuccedOrFailed } from "./myUtils";
  import { creditCardServiceC } from "./globals";
  import ValidatorCreditCardEditor from "./ValidatorCreditCardEditor.svelte";
  import { MyValidator } from "./MyValidator";

  /**
   * Credit card to edit in this form
   */
  let creditCard: CreditCardC;
  /**
   * true while page is loading
   */
  let loading: boolean;
  /**
   * translation identifier that changes if
   * user changes from add to edit and backward
   */
  let title: string = "addcard";
  /**
   * true if user clicks any edit button in the credit cards list
   */
  let editing: boolean;
  /**
   * object instance that check all fields of this form using validations
   * defined in ValidatorCreditCardEditor 
   */
  let validator: MyValidator;

  //FIELD VARIABLES
  /**
   * Text value of holder name input field
   */
  let formHolderName: string = "";
  /**
   * Text value of card number input field
   */
  let formCardNumber: string = "";
  /**
   * Text value of expiration date input field
   */
  let formExpirationDate: string = "";
  /**
   * Text value of cvv input field
   */
  let formCvv: string = "";

  //ICONS
  /**
   * css class of circle icon to show next to holder name input
   */
  let iconHolderNameClass: string = iconClassBase + iconClassCircle;
  /**
   * css class of credit card icon to show next to card number input
   */
  let iconCardNumberClass: string = iconClassBase + iconClassCreditCard;
  /**
   * css class of calendar icon to show next to expiration date input
   */
  let iconExpirationDateClass: string = iconClassBase + iconClassCalendar;
  /**
   * css class of key icon to show next to cvv input
   */
  let iconCvvClass: string = iconClassBase + iconClassKey;

  /**
   * It empties the form and subscribes onEditCard function to updates
   * on observable object credit card of the service, this updates when
   * user click edit buttons in the credit cards list
   */
  onMount(async function (): Promise<void> {
    loading = false;
    editing = false;
    creditCard = new CreditCardC({
      holderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    }); //empty card
    creditCard.setId(null);
    title = "addcard";
    creditCardServiceC.getCreditCardToEdit().subscribe(onEditCard);
  });

  /**
   * It receives credit card data, resets the form and show that data in the fields of the form
   * also it switches to edit mode
   * @param creditCard1 credit card data
   */
  function onEditCard(creditCard1: CreditCardC): void {
    resetForm();
    creditCard.setId(creditCard1.getId());
    creditCard.setCreationDate(creditCard1.getCreationDate());
    creditCard.setUpdateDate(creditCard1.getUpdateDate());
    editing = true;
    title = "editcard";
    formHolderName = creditCard1.getHolderName();
    formCardNumber = creditCard1.getCardNumber();
    formExpirationDate = creditCard1.getExpirationDate();
    formCvv = "" + creditCard1.getCvv();
  }

  /**
   * It validates the input's value of the field, it refreshes validator instace
   * to force a refresh of validation error messages and it change the color of the field's icon
   * @param input text value of the blurred input
   * @param index of the blurred input
   * @param iconClassX css class of the icon of the blurred input field
   * @returns new css class of the icon
   */
  function onBlurGeneric(
    input: string,
    index: number,
    iconClassX: string
  ): string {
    validator.validateField(input, index);
    validator = validator; //force svelte reactivity
    return iconSuccedOrFailed(validator.getPassed()[index], iconClassX);
  }

  /**
   * It is called when user blur holder name field
   */
  function onBlurHolderName() {
    iconHolderNameClass = onBlurGeneric(formHolderName, 0, iconClassCircle);
  }

  /**
   * It is called when user blur card number field
   */
  function onBlurCardNumber() {
    iconCardNumberClass = onBlurGeneric(formCardNumber, 1, iconClassCreditCard);
  }

  /**
   * It is called when user blur expiration date field
   */
  function onBlurExpirationDate() {
    iconExpirationDateClass = onBlurGeneric(formExpirationDate, 2, iconClassCalendar);
  }
  function onBlurCvv() {
    iconCvvClass = onBlurGeneric(formCvv, 3, iconClassKey);
  }

  /**
   * It is called when user blur cvv field
   */
  function resetForm(): void {
    formHolderName = "";
    formCardNumber = "";
    formExpirationDate = "";
    formCvv = "";
    title = "addcard";
    iconHolderNameClass = iconClassBase + iconClassCircle;
    iconCardNumberClass = iconClassBase + iconClassCreditCard;
    iconExpirationDateClass = iconClassBase + iconClassCalendar;
    iconCvvClass = iconClassBase + iconClassKey;
  }

  /**
   * It resets form data and icon colors of the fields
   */
  async function submit() {
    let creditCardFormValues: any = {
      holderName: formHolderName,
      cardNumber: formCardNumber,
      expirationDate: formExpirationDate,
      cvv: formCvv,
    };
    let id: string = creditCard.getId();
    let creationDate: Date = creditCard.getCreationDate();
    creditCard = new CreditCardC(creditCardFormValues);
    resetForm();
    if (editing) {
      creditCard.setId(id);
      creditCard.setCreationDate(creationDate);
      await creditCardServiceC.serverUpdateCreditCard(creditCard);
      editing = false;
    } else {
      await creditCardServiceC.serverAddCreditCard(creditCard);
    }
    //RX observer pattern
    creditCardServiceC.setNewList(
      await creditCardServiceC.serverGetCreditCards()
    );
  }
  validator = new MyValidator([], ""); //validations array is fille inside ValidatorCreditCardEditor
</script>

<ValidatorCreditCardEditor bind:validator />
<div class="card">
  <div class="card-body">
    <h5 class="title mb-3">
      {$_(title)}
      {#if loading}
        <div class="spinner-border float-end" role="status">
          <span class="visually-hidden">{$_("loading")}</span>
        </div>
      {/if}
    </h5>
    <form>
      <CreditCardField
        fieldName="formHolderName"
        filedIconClass={iconHolderNameClass}
        fieldPlaceHolder={$_("placeholdercardholdername")}
        bind:fieldValue={formHolderName}
        fieldError={validator.getErrorsToShow()[0]}
        fieldBlur={onBlurHolderName}
      />
      <CreditCardField
        fieldName="formCardNumber"
        filedIconClass={iconCardNumberClass}
        fieldPlaceHolder={$_("placeholdercardsnumber")}
        bind:fieldValue={formCardNumber}
        fieldError={validator.getErrorsToShow()[1]}
        fieldBlur={onBlurCardNumber}
      />
      <div class="row">
        <div class="col-lg-7">
          <CreditCardField
            fieldName="formExpirationDate"
            filedIconClass={iconExpirationDateClass}
            fieldPlaceHolder={$_("placeholderdate")}
            bind:fieldValue={formExpirationDate}
            fieldError={validator.getErrorsToShow()[2]}
            fieldBlur={onBlurExpirationDate}
          />
        </div>
        <div class="col-lg-5">
          <div class="input-group input-group-lg mb-3">
            <span class="input-group-text">
              <i class={iconCvvClass} />
            </span>
            <input
              type="password"
              name="formCvv"
              class="form-control"
              placeholder={$_("placeholdercvv")}
              bind:value={formCvv}
              on:blur={onBlurCvv}
              data-testid="cvv"
            />
            {#if validator.getErrorsToShow()[3] != ""}
              <div style="color:red">{validator.getErrorsToShow()[3]}</div>
            {/if}
          </div>
        </div>
      </div>
      <div class="d-grid gap-2">
        <button
          data-testid="submit"
          class="btn btn-success btn-lg"
          type="button"
          on:click={submit}
          disabled={!validator.allPassed()}
        >
          <i class="fas fa-database" />
          {#if editing}
            {$_("savechanges")}
          {:else}
            {$_("add")}
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>

<style>
  .title {
    text-align: center;
    font-family: "Potta One", cursive;
  }
</style>

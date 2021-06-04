<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  
  import type { CreditCardC } from "./CreditCardC";
  import { creditCardServiceC } from "./globals";

  /**
   * Credit cards list to show
   */
  let creditCardList: CreditCardC[] = [];
  $: {
    creditCardList = creditCardList;
  }
  /**
   * It calls the service to make a request to the server for update the credit cards list
   */
  async function getCreditCardList(): Promise<void> {
    creditCardList = await creditCardServiceC.serverGetCreditCards();
  }
  /**
   * It refreshes the credit cards list and it subscribes the updateCreditCardList function
   * to the observable list updates of the service
   */
  onMount(async function (): Promise<void> {
    creditCardList = [];
    getCreditCardList();
    creditCardServiceC.getNewList().subscribe(updateCreditCardList);
  });
  /**
   * It refreshes the shown list using the service's updated list
   * @param newList service's updated list
   */
  function updateCreditCardList(newList: CreditCardC[]): void {
    if (newList != undefined) {
      creditCardList = newList;
    }
  }
  /**
   * It updates the credit card to edit observable object of service
   * with the clicked credit card data
   * @param creditCard clicked credit card from the list
   */
  function clickEditCreditCard(creditCard: CreditCardC) {
    creditCardServiceC.addCreditCardToEdit(creditCard);
  }
  /**
   * It calls the service to make a request of removal of a credit card to the server
   * if credit card was successfully deleted then it refreshes the credit cards list
   * @param creditCard clicked credit card from the list
   */
  function clickDeleteCreditCard(creditCard: CreditCardC) {
    creditCardServiceC.serverDeleteCreditCard(creditCard.getId())
    .then(function (deleted): void {
        if (deleted) {
            getCreditCardList();
        }
    })
    .catch((error1: Error) => {
        console.error(error1.message);
    });
  }
</script>

<div class="card">
  <div class="card-body">
    <h5 class="title">{$_("creditcards")}</h5>
    <table class="table">
      <tbody>
        {#each creditCardList as creditCard, index}
          <tr>
            <td>{creditCard.getHolderName()}</td>
            <td>{creditCard.getCardNumber()}</td>
            <td>{creditCard.getExpirationDate()}</td>
            <td>
              <i
                data-testid={"edit" + index}
                on:click={() => {
                  clickEditCreditCard(creditCard);
                }}
                class="far fa-edit text-info"
              />
              <i
                data-testid={"delete" + index}
                on:click={() => {
                  clickDeleteCreditCard(creditCard);
                }}
                class="far fa-trash-alt text-danger"
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .title {
    text-align: center;
    font-family: "Potta One", cursive;
  }
</style>

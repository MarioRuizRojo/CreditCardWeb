<script lang="ts">
  import { _, locale, addMessages } from "svelte-i18n";

  import en from "./en.json";
  import es from "./es.json";

  import CreditCardEditor from "./CreditCardEditor.svelte";
  import { lang, testing } from "./globals";
  import CreditCardList from "./CreditCardList.svelte";
  import MyDropDown from "./MyDropDown.svelte";
  import { MyDropDownOption } from "./MyDropDownOption";

  if (!testing.testing) {
    addMessages("en", en);
    addMessages("es", es);
  }
  $: locale.set(lang.sel);

  /**
   * Option to show in the dropdown list
   * When clicked it changes selected language to English
   * Button label caption is "English"
   * It shows UK flag
   */
  let dropDownOptionEN: MyDropDownOption = new MyDropDownOption(
    () => (lang.sel = "en"),
    "English",
    "flag flag-uk"
  );
  /**
   * Option to show in the dropdown list
   * When clicked it changes selected language to Spanish
   * Button label caption is "Español"
   * It shows ES flag
   */
  let dropDownOptionES: MyDropDownOption = new MyDropDownOption(
    () => (lang.sel = "es"),
    "Español",
    "flag flag-es"
  );
  /**
   * Options list of the dropdown
   */
  let dropDownOptions: MyDropDownOption[] = [
    dropDownOptionEN,
    dropDownOptionES,
  ];
</script>

<main>
  <div>
    <span class="nav navbar-nav navbar-right">
      <MyDropDown mainCaption={$_("selectlang")} {dropDownOptions} />
    </span>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-body">
            <h1 class="title">{$_("creditcardapp")}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-6">
        <CreditCardEditor />
      </div>
      <div class="col-lg-6">
        <CreditCardList />
      </div>
    </div>
  </div>
</main>

<style>
  .title {
    text-align: center;
    font-family: "Potta One", cursive;
  }
</style>

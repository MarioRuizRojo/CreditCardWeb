<script lang="ts">
  import { onMount } from "svelte";

  import { iconClassCaretDown, iconClassCaretLeft } from "./constants";
  import type { MyDropDownOption } from "./MyDropDownOption";
  import { dummyFunction } from "./myUtils";
  /**
   * List of options to show inside the dropdown
   */
  export let dropDownOptions: MyDropDownOption[] = [];
  /**
   * label caption text to show in the main button of dropdown
   */
  export let mainCaption: String = "";

  /**
   * list of options of dropdown hidden if true
   */
  let hideOptionsList: boolean = true;
  /**
   * caret icon to show, left caret if the options list is hidden
   * and down caret if the options list is shown
   */
  let caret: string = iconClassCaretLeft;
  /**
   * Height of the options list div container
   */
  let optionsDivHeight: number = 0;
  /**
   * X axis position of the options list div container
   * it is a relative position to main button
   */
  let optionsDivPositionTop: number = 0;

  /**
   * When main button mounted it calculates proportional size and
   * position of the options list div container
   */
  onMount(function (): void {
    let mainButton: HTMLElement = document.getElementById("mainButton");
    let mainButtonHeight: number = mainButton.offsetHeight;
    optionsDivHeight = 1.6 * mainButtonHeight;
    optionsDivPositionTop = -0.3 * mainButtonHeight;
  });

  /**
   * It alternate visibility of the options list div container
   * and the caret icon direction
   * @param handleOption function to execute if the option is clicked
   */
  function handleClick(handleOption: () => void): void {
    hideOptionsList = !hideOptionsList;
    if (caret == iconClassCaretLeft) {
      caret = iconClassCaretDown;
    } else {
      caret = iconClassCaretLeft;
    }
    handleOption(); //if clicked from main button this function is dummy ()=>{}
  }
</script>

<div class="col">
  <!-- Main Button -->
  <button
    id="mainButton"
    data-testid="mainbuttondropdown"
    class="row dropdownred"
    type="button"
    on:click={() => handleClick(dummyFunction)}
  >
    {mainCaption}
    <!-- Caret -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class={"iconCaret " + caret}
      viewBox="0 0 16 16"
    >
      {#if hideOptionsList}
        <path
          d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
        />
      {:else}
        <path
          d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"
        />
      {/if}
    </svg>
  </button>
  <!-- options div -->
  <div
    class="row"
    style={"display: inline-block; position: absolute; inset: " +
      optionsDivPositionTop +
      "px auto auto 0px; margin: 0px; transform: translate(0px, " +
      optionsDivHeight +
      "px);"}
    hidden={hideOptionsList}
  >
    {#each dropDownOptions as dropDownOption, index}
      <!-- option -->
      <button
        data-testid={"option" + index}
        class="row btn dropdownred"
        type="button"
        on:click={() => handleClick(dropDownOption.getHandleClick())}
      >
        <i class={dropDownOption.getCssClass()} />{dropDownOption.getText()}
      </button>
    {/each}
  </div>
</div>

<style>
  .dropdownred {
    color: grey;
    background-color: #540402;
  }
  .iconCaret {
    display: inline-block;
    min-width: 16px;
    height: 16px;
    padding-right: 0px;
    padding-left: 0px;
    max-width: 16px;
    vertical-align: middle;
    line-height: revert;
    position: relative;
    top: 5px;
  }
</style>

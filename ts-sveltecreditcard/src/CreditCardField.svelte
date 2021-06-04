<script lang="ts">
  /**
   * name of the field of the form
   */
  export let fieldName: string;
  /**
   * css class of the icon to show in this field
   */
  export let filedIconClass: string;
  /**
   * text to show in the input field when empty
   */
  export let fieldPlaceHolder: string;
  /**
   * text value of the field
   */
  export let fieldValue: string;
  /**
   * text to show when validation fails
   */
  export let fieldError: string;
  /**
   * function to execute when user blur this input
   */
  export let fieldBlur: () => void;
</script>

<div
  data-testid={"maindiv" + fieldName}
  class="input-group input-group-lg mb-3"
>
  <span class="input-group-text">
    <i data-testid={"icon" + fieldName} class={filedIconClass} />
  </span>
  <input
    data-testid={"input" + fieldName}
    type="text"
    name={fieldName}
    class="form-control"
    placeholder={fieldPlaceHolder}
    bind:value={fieldValue}
    on:blur={fieldBlur}
  />
  {#if fieldError != ""}
    <div data-testid={"errorDiv" + fieldName} style="color:red">
      {fieldError}
    </div>
  {/if}
</div>

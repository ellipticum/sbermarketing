<script>
  import { onMount } from 'svelte'

  let rates = {}
  let amountFrom = 1
  let currencyFrom = 'USD'
  let currencyTo = 'EUR'
  let amountTo = 1

  async function fetchRates() {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
    const data = await res.json()
    rates = data.rates
    convert('from')
  }

  const convert = (direction) => {
    if (direction === 'from') {
      amountTo = (amountFrom * (rates[currencyTo] || 0)).toFixed(2)
    } else {
      amountFrom = (amountTo / (rates[currencyTo] || 0)).toFixed(2)
    }
  }

  function switchCurrencies() {
    [currencyFrom, currencyTo] = [currencyTo, currencyFrom];
    [amountFrom, amountTo] = [amountTo, amountFrom];
    fetchRates();
  }

  onMount(fetchRates)
</script>

<div class='container animated'>
  <div class='groups'>
    <div class='group'>
      <select bind:value={currencyFrom} on:change="{fetchRates}">
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value="AUD">AUD</option>
        <option value="RUB">RUB</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
      </select>

      <input type='number' bind:value={amountFrom} on:input={() => convert('from')}>
    </div>

    <div class='group'>
      <select bind:value={currencyTo} on:change={() => convert('from')}>
        <option value='EUR'>EUR</option>
        <option value='USD'>USD</option>
        <option value="AUD">AUD</option>
        <option value="RUB">RUB</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
      </select>

      <input type='number' bind:value={amountTo} on:input={() => convert('to')}>
    </div>
  </div>

  <button on:click={switchCurrencies} class="switch-button">Switch</button>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to right, #ff95ff 0%, #0055ff 100%);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .switch-button {
    width: 100%;
    padding: 5px 15px;
    border-radius: 20px;
    background: #555;
  }

  .groups {
    display: flex;
    gap: 15px;
  }

  div.container {
    padding: 25px 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 500px;
    background: #f9f9f9;
    color: #333;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  select,
  input {
    width: 100%;
  }

  select, input[type='number'] {
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-size: 1rem;
    color: #333;
  }

  select:hover, input[type='number']:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  select:focus, input[type='number']:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  .currency-label {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated {
    animation: fadeIn 0.75s ease-out;
  }
</style>

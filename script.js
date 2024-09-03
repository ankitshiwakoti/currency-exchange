document.addEventListener('DOMContentLoaded', () => {
    const accessKey = '0919f7ac3a614c4b927a37f7106568a5';
    const apiURL = `https://data.fixer.io/api/latest?access_key=${accessKey}`;

    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convert-button');
    const convertedAmount = document.getElementById('converted-amount');
    const exchangeRateText = document.getElementById('exchange-rate');
    const fromCurrencySymbol = document.getElementById('from-currency-symbol');
    const toCurrencySymbol = document.getElementById('to-currency-symbol');

    let rates = {};

    // Fetch currency rates and populate select options
    async function fetchRates() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            console.log(data);
            rates = data.rates;
            console.log(rates);

            // Populate select options
            const currencies = Object.keys(rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });

            // Set default values
            fromCurrencySelect.value = 'CAD';
            toCurrencySelect.value = 'NPR';
            

        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }
    }

    // Convert currency and display the exchange rate
    function convertCurrency() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];
        const conversionRate = rateTo / rateFrom;
        const converted = amount * conversionRate;

        convertedAmount.textContent = converted.toFixed(2);
        exchangeRateText.innerHTML = `1 ${fromCurrency} = ${conversionRate.toFixed(2)} ${toCurrency}`;
        fromCurrencySymbol.textContent = fromCurrency;
        toCurrencySymbol.textContent = toCurrency;
    }

    // Event listener for the convert button
    convertButton.addEventListener('click', convertCurrency);

    // Initial fetch of rates
    fetchRates();
});

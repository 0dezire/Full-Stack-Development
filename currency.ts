import axios from 'axios';

interface ExchangeRateResponse {
    rates: Record<string, number>;
    base: string;
    date: string;
}

async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
    try {
        // Make a GET request to the API
        const response = await axios.get<ExchangeRateResponse>(`https://api.exchangerate-api.com/v4/latest/${from}`);
        
        // Check if the response is successful
        if (response.status === 200 && response.data && response.data.rates) {
            // Extract exchange rates from the response
            const exchangeRates = response.data.rates;

            // Check if the destination currency is available in the rates
            if (to in exchangeRates) {
                // Convert the amount to the destination currency
                const rate = exchangeRates[to];
                const convertedAmount = amount * rate;
                return convertedAmount;
            } else {
                throw new Error(`Currency "${to}" is not available.`);
            }
        } else {
            throw new Error('Failed to fetch exchange rates.');
        }
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
}

// Example usage
(async () => {
    try {
        const amount = 100; // Amount to convert
        const fromCurrency = 'USD'; // Source currency
        const toCurrency = 'EUR'; // Destination currency

        // Convert currency
        const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    } catch (error) {
        console.error(error.message);
    }
})();

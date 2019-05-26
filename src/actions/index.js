import queryString from 'query-string';
import {
    CONVERT_CURRENCY,
    CONVERT_CURRENCY_ERROR
} from '../constants/ActionTypes';

export const convertCurrency = (payload) => {
    return async(dispatch) => {
        const { sourceCurrency, targetCurrency, amount } = payload;
        const params = queryString.stringify({
            app_id: process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID,
            base: sourceCurrency,
            symbols: 'EUR,USD,INR,JPY'
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_OPEN_EXCHANGE_RATES_URI}?${params}`);
            const jsonResponse = await response.json();

            if (jsonResponse['error'] && jsonResponse.error) {
                throw new Error(jsonResponse.description);
            }

            const rate = jsonResponse.rates[targetCurrency] || 0;

            dispatch({
                type: CONVERT_CURRENCY,
                payload: {
                    rate,
                    amount,
                    sourceCurrency,
                    targetCurrency
                }
            });
        } catch (err) {
            dispatch({
                type: CONVERT_CURRENCY_ERROR,
                error: err.message
            });
        }
    };
}

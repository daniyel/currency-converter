import {
    CONVERT_CURRENCY,
    CONVERT_CURRENCY_ERROR
} from '../constants/ActionTypes';

const initialState = {
    sourceCurrency: '',
    targetCurrency: '',
    rate: 0,
    amount: 0,
    error: '',
    conversions: []
};

const rootReducer = (state = initialState, action) => {
    if (action.type === CONVERT_CURRENCY) {
        const { rate, amount, sourceCurrency, targetCurrency } = action.payload;
        let conversions = state.conversions || [];

        return Object.assign({}, state, {
            rate: rate,
            amount: amount,
            sourceCurrency: sourceCurrency,
            targetCurrency: targetCurrency,
            conversions: conversions.concat({
                amount,
                rate,
                targetCurrency,
                sourceCurrency
            })
        });
    }

    if (action.type === CONVERT_CURRENCY_ERROR) {
        const { error } = action;

        return Object.assign({}, state, {
            error
        });
    }

    return state;
};

export default rootReducer;

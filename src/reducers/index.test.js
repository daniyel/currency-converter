import rootReducer from './index';
import * as types from '../constants/ActionTypes';

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(rootReducer(undefined, {})).toEqual({
            sourceCurrency: '',
            targetCurrency: '',
            rate: 0,
            amount: 0,
            error: '',
            conversions: []
        });
    });

    it('should handle CONVERT_CURRENCY', () => {
        const sourceCurrency = 'USD';
        const targetCurrency = 'EUR';
        const amount = 4;
        const rate = 0.892339;
        const payload = {
            rate,
            amount,
            sourceCurrency,
            targetCurrency
        };

        expect(
            rootReducer([], {
                type: types.CONVERT_CURRENCY,
                payload
            })
        ).toEqual({
            rate,
            amount,
            sourceCurrency,
            targetCurrency,
            conversions: [
                {
                    amount,
                    rate,
                    sourceCurrency,
                    targetCurrency
                }
            ]
        });
    });

    it('should handle CONVERT_CURRENCY_ERROR', () => {
        const error = new Error('error');
        expect(
            rootReducer([], {
                type: types.CONVERT_CURRENCY_ERROR,
                error: error.message
            })
        ).toEqual({
            error: 'error'
        });
    });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as types from '../constants/ActionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('dispatches CONVERT_CURRENCY, when fetching currencies has been done', () => {
        const sourceCurrency = 'USD';
        const targetCurrency = 'EUR';
        const amount = 4;
        const rate = 0.892339;
        const body = {
            'disclaimer': 'Usage subject to terms: https://openexchangerates.org/terms',
            'license': 'https://openexchangerates.org/license',
            'timestamp': 1558857428,
            'base': 'USD',
            'rates': {
                'EUR': rate,
                'INR': 69.38,
                'JPY': 109.315,
                'USD': 1
            }
        };
        const base = 'USD';
        const symbols = encodeURIComponent('EUR,USD,INR,JPY');
        const payload = {
            rate,
            amount,
            sourceCurrency,
            targetCurrency
        };

        fetchMock.getOnce(`${process.env.REACT_APP_OPEN_EXCHANGE_RATES_URI}?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID}&base=${base}&symbols=${symbols}`, {
            body,
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.CONVERT_CURRENCY, payload }
        ];
        const store = mockStore({
            sourceCurrency: '',
            targetCurrency: '',
            rate: 0,
            amount: 0,
            error: ''
        });

        return store.dispatch(actions.convertCurrency({
            sourceCurrency,
            targetCurrency,
            amount
        })).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches CONVERT_CURRENCY_ERROR, when fetching currencies throws an error', () => {
        const base = 'USD';
        const symbols = encodeURIComponent('EUR,USD,INR,JPY');
        const sourceCurrency = 'USD';
        const targetCurrency = 'EUR';
        const amount = 4;

        fetchMock.getOnce(`${process.env.REACT_APP_OPEN_EXCHANGE_RATES_URI}?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID}&base=${base}&symbols=${symbols}`, {
            throws: new Error('error'),
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.CONVERT_CURRENCY_ERROR, error: 'error' }
        ];
        const store = mockStore({
            sourceCurrency: '',
            targetCurrency: '',
            rate: 0,
            amount: 0,
            error: ''
        });

        return store.dispatch(actions.convertCurrency({
            sourceCurrency,
            targetCurrency,
            amount
        })).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

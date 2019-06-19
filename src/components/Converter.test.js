import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { convertCurrency } from '../actions/index';
import { Converter } from './Converter';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('Converter', () => {
        it('should render initial state', () => {
            const wrapper = shallow(<Converter convertCurrency={convertCurrency} rate={0} />);

            expect(wrapper.find('input[name="amount"]').props().value).toBe('');
            expect(wrapper.find('select.currency-select-source').props().value).toBe('');
            expect(wrapper.find('select.currency-select-target').props().value).toBe('');
        });

        it('should handle currency conversion', () => {
            const convertCurrencyPropsSpy = jest.fn();
            const wrapper = shallow(<Converter convertCurrency={convertCurrencyPropsSpy} rate={0.876} />);

            expect(wrapper.state('amount')).toEqual(0);
            wrapper.find('input[name="amount"]').simulate('change', { target: { value: 10 }});
            expect(wrapper.state('amount')).toEqual(10);

            expect(wrapper.state('sourceCurrency')).toEqual('');
            wrapper.find('select.currency-select-source').simulate('change', { target: { value : 'USD' }});
            expect(wrapper.state('sourceCurrency')).toEqual('USD');
            expect(wrapper.find('select.currency-select-source option[disabled=true]').props().value).toBe('USD');

            expect(wrapper.state('targetCurrency')).toEqual('');
            wrapper.find('select.currency-select-target').simulate('change', { target: { value : 'EUR' }});
            expect(wrapper.state('targetCurrency')).toEqual('EUR');
            expect(wrapper.find('select.currency-select-target option[disabled=true]').props().value).toBe('EUR');

            jest.useFakeTimers();
            wrapper.instance().handleForm(new Event('submit'));
            jest.runAllTimers();

            expect(convertCurrencyPropsSpy).toBeCalledWith({
                amount: 10,
                sourceCurrency: 'USD',
                targetCurrency: 'EUR'
            });
        });

       it('should not handle currency conversion, if currencies are not different', () => {
            const convertCurrencyPropsSpy = jest.fn();
            const wrapper = shallow(<Converter convertCurrency={convertCurrencyPropsSpy} rate={0.876} />);

            expect(wrapper.state('amount')).toEqual(0);
            wrapper.find('input[name="amount"]').simulate('change', { target: { value: 10 }});
            expect(wrapper.state('amount')).toEqual(10);

            expect(wrapper.state('sourceCurrency')).toEqual('');
            wrapper.find('select.currency-select-source').simulate('change', { target: { value : 'USD' }});
            expect(wrapper.state('sourceCurrency')).toEqual('USD');
            expect(wrapper.find('select.currency-select-source option[disabled=true]').props().value).toBe('USD');

            expect(wrapper.state('targetCurrency')).toEqual('');
            wrapper.find('select.currency-select-target').simulate('change', { target: { value : 'USD' }});
            expect(wrapper.state('targetCurrency')).toEqual('USD');
            expect(wrapper.find('select.currency-select-target option[disabled=true]').props().value).toBe('USD');

            jest.useFakeTimers();
            wrapper.instance().handleForm(new Event('submit'));
            jest.runAllTimers();

            expect(convertCurrencyPropsSpy).not.toBeCalled();
        });
    });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import History from './History';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('History', () => {
        it('should render initial state', () => {
            const wrapper = shallow(<History />);

            wrapper.setState({ conversions: [] });

            expect(wrapper.find('div').hasClass('converter-history')).toBe(true);
            expect(wrapper.find('h4').hasClass('converter-history-header')).toBe(true);
            expect(wrapper.find('ul').hasClass('converter-history-list')).toBe(true);
            expect(wrapper.find('ul').html()).toEqual('<ul class="converter-history-list"></ul>');
        });

        it('should render, when not initial values are passed', () => {
            const sourceCurrency = 'USD';
            const targetCurrency = 'EUR';
            const amount = 4;
            const rate = 0.892339;

            const conversions = [{
                rate,
                amount,
                sourceCurrency,
                targetCurrency
            }];

            const wrapper = shallow(<History />);

            wrapper.setState({ conversions });

            expect(wrapper.find('div').hasClass('converter-history')).toBe(true);
            expect(wrapper.find('h4').hasClass('converter-history-header')).toBe(true);
            expect(wrapper.find('ul').hasClass('converter-history-list')).toBe(true);
            expect(wrapper.find('ul').html()).toEqual('<ul class="converter-history-list"><li class="converter-history-item converter-history-item-0">4 USD = 3.57 EUR</li></ul>');
        });

        it('should process conversions history, limited to 10 items', () => {
            const sourceCurrency = 'USD';
            const targetCurrency = 'EUR';
            const amount = 4;
            const rate = 0.892339;
            const item = {
                rate,
                amount,
                sourceCurrency,
                targetCurrency
            };
            let conversions = [];

            for (let i = 0; i < 20; i++) {
                conversions = [...conversions, item];
            }

            const wrapper = shallow(<History />);

            wrapper.setState({ conversions });

            expect(wrapper.find('div').hasClass('converter-history')).toBe(true);
            expect(wrapper.find('h4').hasClass('converter-history-header')).toBe(true);
            expect(wrapper.find('ul').hasClass('converter-history-list')).toBe(true);
            expect(wrapper.find('li').length).toEqual(10);
        });
    });
});

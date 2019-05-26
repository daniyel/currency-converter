import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Result from './Result';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('Result', () => {
        it('should render initial state', () => {
            const sourceCurrency = '';
            const targetCurrency = '';
            const amount = 0;
            const rate = 0;

            const wrapper = shallow(<Result sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} amount={amount} rate={rate} />);

            expect(wrapper.text()).toBe('');
        });

        it('should render, when not initial values are passed', () => {
            const sourceCurrency = 'USD';
            const targetCurrency = 'EUR';
            const amount = 4;
            const rate = 0.892339;

            const wrapper = shallow(<Result sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} amount={amount} rate={rate} />);

            expect(wrapper.find('span').text()).toBe(`${amount} USD = 3.57 EUR`);
        });
    });
});

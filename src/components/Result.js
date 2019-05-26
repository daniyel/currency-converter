import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calculateAmount } from '../helpers/calc';

class Result extends Component {

    render() {
        const { amount, sourceCurrency, targetCurrency, rate } = this.props;
        const targetAmount = calculateAmount(amount, rate);

        return (
            (sourceCurrency && targetCurrency && amount && targetAmount)
                ? <span>{amount} {sourceCurrency} = {targetAmount} {targetCurrency}</span>
                : null
        );
    }

};

Result.propTypes = {
    rate: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    sourceCurrency: PropTypes.string.isRequired,
    targetCurrency: PropTypes.string.isRequired
};

export default Result;

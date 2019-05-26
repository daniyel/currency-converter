import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store/index';
import ConverterConnected from './Converter';
import History from './History';
import Result from './Result';

const mapStateToProps = state => {
    return {
        rate: state.rate,
        amount: state.amount,
        sourceCurrency: state.sourceCurrency,
        targetCurrency: state.targetCurrency
    };
};

export class Widget extends Component {

    constructor() {
        super();
        this.state = {
            sourceCurrency: '',
            targetCurrency: '',
            amount: 0,
            convertedAmount: 0,
            rate: 0,
            currencies: [
                {
                    code: '',
                    text: 'Choose'
                },
                {
                    code: 'EUR',
                    text: 'Euro'
                }, {
                    code: 'USD',
                    text: 'US-Dollar'
                }, {
                    code: 'INR',
                    text: 'Indian rupees'
                }, {
                    code: 'JPY',
                    text: 'Japanese Yen'
                }
            ]
        };

        store.subscribe(() => {
            this.setState({
                rate: store.getState().rate
            });
        });
    }

    render() {
        const { rate, amount, sourceCurrency, targetCurrency } = this.props;

        return (
            <div className="converter-section">
                <ConverterConnected />
                <div className="converter-result">
                    <Result rate={rate} amount={amount} sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} />
                </div>
                <History />
            </div>
        );
    }
};

Widget.propTypes = {
    rate: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    sourceCurrency: PropTypes.string.isRequired,
    targetCurrency: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(Widget);

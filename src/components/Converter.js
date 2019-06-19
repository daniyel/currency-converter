import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertCurrency } from '../actions/index';
import store from '../store/index';

const mapStateToProps = state => {
    return {
        rate: state.rate
    };
};

function mapDispatchToProps(dispatch) {
    return {
        convertCurrency: currencyData => dispatch(convertCurrency(currencyData))
    };
}

const ArrowDownIcon = () => (
    <div className="icon">
        <svg className="arrow-down" viewBox="0 0 12 9" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img">
            <g stroke="none" fill="none" fillRule="evenodd">
                <g transform="translate(-292.000000, -126.000000)" fill="#002272" fillRule="nonzero">
                    <g transform="translate(286.000000, 118.000000)">
                        <polygon points="7.41 8.84 12 13.42 16.59 8.84 18 10.25 12 16.25 6 10.25"></polygon>
                    </g>
                </g>
            </g>
        </svg>
    </div>
);

export class Converter extends Component {

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

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSourceCurrencyChange = this.handleSourceCurrencyChange.bind(this);
        this.handleTargetCurrencyChange = this.handleTargetCurrencyChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleAmountChange(event) {
        this.setState({ amount: parseInt(event.target.value, 10) });
    }

    handleSourceCurrencyChange(event) {
        this.setState({ sourceCurrency: event.target.value });
    }

    handleTargetCurrencyChange(event) {
        this.setState({ targetCurrency: event.target.value });
    }

    handleForm(event) {
        event.preventDefault();

        if (this.state.sourceCurrency !== this.state.targetCurrency) {

            const { amount, sourceCurrency, targetCurrency } = this.state;

            if (sourceCurrency !== targetCurrency) {
                this.props.convertCurrency({
                    sourceCurrency,
                    targetCurrency,
                    amount
                });
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleForm} id="currencyConvertForm">
                <input className="input" type="text" name="amount" placeholder="Amount" value={this.state.amount ? this.state.amount : ''} onChange={this.handleAmountChange} />
                <div className="currency-select">
                    <select className="select currency-select-source" onChange={this.handleSourceCurrencyChange} value={this.state.sourceCurrency}>
                        {this.state.currencies.map((currency, index) => (
                            <option value={currency.code} key={index} disabled={currency.code === this.state.sourceCurrency && currency.code !== ''}>{currency.text}</option>
                        ))}
                    </select>
                    <ArrowDownIcon />
                </div>
                <div className="convert-icon">
                    <svg width="25px" height="25px" viewBox="0 0 50 47" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-label="Inverse button" role="img">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-297.000000, -595.000000)" fill="#273746">
                                <g transform="translate(50.000000, 394.000000)">
                                    <g transform="translate(247.000000, 201.000000)">
                                        <g transform="translate(7.142857, 25.000000)">
                                            <polygon points="42.7539856 10.9773747 19.455409 0 19.455409 7.87415338 0 7.87415338 0 14.080596 19.455409 14.080596 19.455409 21.9547493"></polygon>
                                        </g>
                                        <g transform="translate(21.428571, 11.309524) rotate(-180.000000) translate(-21.428571, -11.309524) ">
                                            <polygon points="42.7539856 10.9773747 19.455409 0 19.455409 7.87415338 0 7.87415338 0 14.080596 19.455409 14.080596 19.455409 21.9547493"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="currency-select">
                    <select className="select currency-select-target" onChange={this.handleTargetCurrencyChange} value={this.state.targetCurrency}>
                        {this.state.currencies.map((currency, index) => (
                            <option value={currency.code} key={index} disabled={currency.code === this.state.targetCurrency && currency.code !== ''}>{currency.text}</option>
                        ))}
                    </select>
                    <ArrowDownIcon />
                </div>
                <button type="submit" className="button button-primary">Convert</button>
            </form>
        );
    }
};

Converter.propTypes = {
    convertCurrency: PropTypes.func,
    rate: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);

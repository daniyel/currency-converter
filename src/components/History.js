import React, { Component } from 'react';
import store from '../store/index';
import { calculateAmount } from '../helpers/calc';

class History extends Component {

    constructor() {
        super();

        this.state = {
            conversions: []
        };

        store.subscribe(() => {
            this.setState({
                conversions: store.getState().conversions
            });
        });

        this.processConversions = this.processConversions.bind(this);
    }

    processConversions(conversions) {
        let items = [...conversions];

        if (items.length > 10) {
            items.splice(0, items.length - 10);
        }

        const filteredItems = items.filter(item => {
            const { amount, sourceCurrency, targetCurrency, rate } = item;
            const targetAmount = calculateAmount(amount, rate);

            if (amount && sourceCurrency && targetAmount && targetCurrency) {
                return true;
            }
            return false;
        });

        return [...filteredItems].reverse();
    }

    render() {

        const { conversions } = this.state;
        const items = this.processConversions(conversions);

        return (
            <div className="converter-history">
                <h4 className="converter-history-header">Conversions history</h4>
                <ul className="converter-history-list">
                    {items.map((item, index) => (
                        <li className={`converter-history-item converter-history-item-${index}`} key={index}>
                            {item.amount} {item.sourceCurrency} = {calculateAmount(item.amount, item.rate)} {item.targetCurrency}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default History;

import React, { Component } from 'react';
import WidgetConnected from './components/Widget';

class App extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="title">Currency converter</h2>
                <WidgetConnected />
            </div>
        );
    }
}

export default App;

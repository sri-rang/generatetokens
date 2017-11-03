import React from 'react';
import ReactDOM from 'react-dom';
import contract_fixed_supply from './contract_fixed_supply';
import './index.css';

const blurb = `## About

Name       Sri
Location   Amsterdam, NL
Email      srirangan@gmail.com
Website    http://srirangan.net

Programmer with 12+ years experience

What I offer:
- Build smart contracts, wallets and blockchain integrations
- Build crypto-trading bots and automation systems
- Build desktop, mobile and web apps
- Security audits of blockchain systems
- Help build technical team and optimize dev processes

ICOs are tricky..
- Token utility and viability are often misunderstood
- More than 75% projects fail in the development phase
- Legal waters are trecherous

My associates and I can help. Get in touch!
`;

class App extends React.Component {
    input_token_name = null;
    input_token_symbol = null;
    input_token_supply = null;

    constructor(props) {
        super(props);
        this.state = {
            token_name: null,
            token_symbol: null,
            token_supply: null,
            show_smart_contract: false,
            show_upsell: false,
        };
    }

    render() {
        const {show_upsell, show_smart_contract} = this.state;
        const left = <div className='Left'>
            <h1 className='Title'>Generate ERC20 Token Smartcontracts</h1>
            {this.render_form()}
            {show_upsell && this.render_upsell()}
        </div>;
        const right = show_smart_contract && <div className='Right'>
            {this.render_smart_contract()}
        </div>;
        return <div className='App'>{left}{right}</div>;
    }

    render_form() {
        return <div className='Form'>
            <input type='text'
                   required
                   placeholder='Token Name'
                   ref={node => this.input_token_name = node}/>
            <input type='text'
                   required
                   placeholder='Token Symbol'
                   ref={node => this.input_token_symbol = node}/>
            <input type='number'
                   required
                   placeholder='Token Supply'
                   ref={node => this.input_token_supply = node}/>
            <ul>
                <li>Language    Solidity</li>
                <li>Strategy    Allocate tokens to contract owner</li>
            </ul>
            <button onClick={() => this.on_generate_click()}>Generate</button>
        </div>;
    }

    render_upsell() {
        return <div className='Upsell'>
            <div className='Blurb'>{blurb}</div>
        </div>
    }

    render_smart_contract() {
        const contract_name = 'GeneratedERC20Contract';
        const {token_name, token_symbol, token_supply} = this.state;
        const token_decimals = 18;
        const source = contract_fixed_supply(contract_name,
                                             token_name,
                                             token_symbol,
                                             token_supply,
                                             token_decimals);
        return <div className='SmartContract' style={{width: '100%', height: 800}}>{source}</div>;
    }

    on_generate_click() {
        const token_name = this.input_token_name.value;
        const token_symbol = this.input_token_symbol.value;
        const token_supply = this.input_token_supply.value;
        if (!token_name || !token_symbol || !token_supply) return;
        this.setState(Object.assign(this.state, { token_name,
                                                  token_symbol,
                                                  token_supply,
                                                  show_smart_contract: true,
                                                  show_upsell: true }));
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

import React from 'react';
import Cards from 'react-credit-cards';

export default class PaymentForm extends React.Component {
  state = { cvc: '', expiry: '', focus: '', name: '', number: '', cardBrand: "" };

  handleInputFocus = (e) => { this.setState({ focus: e.target.name }); }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.redState(this.state)
  }


  render() {
    return <div id="PaymentForm" >
      <Cards callback={({ issuer }) => this.setState({ ...this.state, cardBrand: issuer })} cvc={this.state.cvc} expiry={this.state.expiry} focused={this.state.focus} name={this.state.name}
        number={this.state.number} />
      <form >
        <input type="text" name="number" maxLength={16} placeholder="Card Number" onChange={this.handleInputChange}
          onFocus={this.handleInputFocus} />

        <input
          type="text" name="name" placeholder="Your name" onChange={this.handleInputChange}
          onFocus={this.handleInputFocus} />

        <input type="text" maxLength={4} name="expiry" placeholder="Valid thru" onChange={this.handleInputChange}
          onFocus={this.handleInputFocus} />

        <input type="text" maxLength={3} name="cvc" placeholder="cvc" onChange={this.handleInputChange}
          onFocus={this.handleInputFocus} />
      </form>
    </div>
  }
}
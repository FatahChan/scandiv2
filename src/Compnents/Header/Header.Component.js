import React, {PureComponent} from 'react';
import {getCategories} from "../../BackendCalls/getCategories";
import {getCurrencies} from "../../BackendCalls/getCurrencies";
import {logo} from "../../Assets/logo";
import {cart} from "../../Assets/cart";
import './Header.css'
import {arrowUp} from "../../Assets/arrowUp";
import {arrowDown} from "../../Assets/arrowDown";
import {Link} from "react-router-dom";
class HeaderComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      showCurrencyDropdown: false,
      isLoading: true,
      selectedCategory: ""
    }
  }
  componentDidMount() {
    this.setupHeader().then(() => {
      this.setState({isLoading: false})
    })
  }


  async setupHeader() {
    await getCategories().then((res) => {
      this.setState({categories: res})
    })
    await getCurrencies().then((res) => {
      this.setState({currencies: res})
    })
  }


  render() {
    if(this.state['isLoading']) { return <div>Loading...</div> }
    const selectedCurrency = this.state['currencies'].filter((currency) => (currency.label === this.props.selectedCurrency))[0]
    let cartCount = 0;
    this.props.cart.forEach((item) => {
      cartCount += item.quantity
    })
    // const currencies = this.state['currencies'].map((currency) => (
    //     <div
    //         key={JSON.stringify({label: currency.label, symbol: currency.symbol})}
    //         id={JSON.stringify({label: currency.label, symbol: currency.symbol})}
    //         className="currency-select-item"
    //         onClick={() => {this.props.setSelectedCurrency(currency.label)}}
    //     >{`${currency.symbol} ${currency.label}`}</div>
    // ))
    return (
        <div className="header">
          <div className="left-header">
          {this.state['categories'].map((category) => (
              <Link key={category} style={{textDecoration: 'none'}} to={`/${category}`}>
                <div key={category} className={`category-selector-header ${this.state['selectedCategory']===category? 'category-selected': ''}`}>
                  {category}
                </div>
              </Link>
          ))}
          </div>
          <div className="middle-header">
            <div className="logo">{logo}</div>
          </div>
          <div className="right-header">
            <div className="currency-selector-header">
              <div  id="currency-dropdown-button" >{selectedCurrency.symbol} {this.state['showCurrencyDropdown']? arrowUp: arrowDown}</div>
              {/*<div id="currency-dropdown" className={`${!this.state['showCurrencyDropdown']?"show": ""}`}>*/}
              {/*  {currencies}*/}
              {/*</div>*/}
            </div>
            <Link to="/cart"><div className="cart-header">{cart}<span className="cart-badge">{cartCount}</span></div></Link>
          </div>
        </div>
    );
  }
}

export default HeaderComponent;
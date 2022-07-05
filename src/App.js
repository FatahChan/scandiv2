import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HeaderComponent from "./Compnents/Header/Header.Component";
import ProductListingPageComponent from "./Compnents/PLP/PLP.Component";
import {getProduct} from "./BackendCalls/getProduct";
import {productsToCartItems} from "./HelperFunction/productsToCartItems";

class App extends Component {
  //        item string, qunitiy
  //cart: {JSON.stringfiy({id: id, attributes: {size: 41}): 2}

  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      selectedCurrency: "USD"
    }
  }

  addToCart(product){
    let currentCart = this.state.cart;
    if(currentCart[product] !== undefined){
      currentCart[product] = Number(currentCart[product]) + 1
      this.setState({cart: currentCart})
      console.log(this.state.cart)
    }else {
      let item = JSON.parse(product)
      console.log(item)
      if(item.attributes === undefined){
        getProduct(item.id).then((res) => {
          item.attributes = res.attributes
          currentCart[JSON.stringify(item)] = 1
          this.setState({
            cart: currentCart
          })
          console.log(this.state.cart)
        })
      }else{
        currentCart[JSON.stringify(item)] = 1
        this.setState({
          cart: currentCart
        })
        console.log(this.state.cart)
      }
    }

  }
  updateCart(products){
    const cart = productsToCartItems(products)
    this.setState({cart: cart})
  }
  setSelectedCurrency(currencyLabel){
    this.setState({selectedCurrency: currencyLabel})
  }
  render() {
    return (
        <div>
          <BrowserRouter>
            <HeaderComponent
              setSelectedCurrency={this.setSelectedCurrency.bind(this)}
            />
            <Switch>
              <Route path="/:category" >
                <ProductListingPageComponent
                    addToCart={this.addToCart.bind(this)}
                    selectedCurrency={this.state.selectedCurrency}
                />
              </Route>
              <Route></Route>
              <Route></Route>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
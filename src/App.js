import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HeaderComponent from "./Compnents/Header/Header.Component";
import ProductListingPageComponent from "./Compnents/PLP/PLP.Component";
import ProductDetailsPageComponent from "./Compnents/PDP/ProductDetailsPage.Component";
import CartComponent from "./Compnents/Cart/Cart.Component";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      selectedCurrency: "USD"
    }
  }

  addToCart(item){
    console.log('adding', item)
    let currentCart = this.state.cart
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].product.id === item.product.id && currentCart[i].attributes === item.attributes) {
        currentCart[i].quantity += 1
        this.setState({cart: currentCart})
        return
      }
    }
    currentCart.push({product: item.product, attributes: item.attributes, quantity: 1})
    this.setState({cart: currentCart})
  }
  removeFromCart(item){
    let currentCart = this.state.cart
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].product.id === item.product.id && currentCart[i].attributes === item.attributes) {
        currentCart.splice(i, 1)
        this.setState({cart: currentCart})
        return
      }
    }
  }
  updateCartItemQuantity(item, quantity){
    let currentCart = this.state.cart
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].product.id === item.product.id && currentCart[i].attributes === item.attributes) {
        currentCart[i].quantity = quantity
        this.setState({cart: currentCart})
        return
      }
    }
  }
  updateCartItemAttributes(item, attributes){
    let currentCart = this.state.cart
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].product.id === item.product.id && currentCart[i].attributes === item.attributes) {
        currentCart[i].attributes = attributes
        this.setState({cart: currentCart})
        return
      }
    }
  }
  setSelectedCurrency(currencyLabel){
    this.setState({selectedCurrency: currencyLabel})
  }
  render() {
    return (
        <div>
          <BrowserRouter>
            <HeaderComponent
                key={JSON.stringify({cart: this.state.cart, selectedCurrency: this.state.selectedCurrency})}
                selectedCurrency={this.state.selectedCurrency}
                setSelectedCurrency={this.setSelectedCurrency.bind(this)}
                cart={this.state.cart}
            />
            <Switch>
              <Route path="/product/:id" render={(props) => (
                  <ProductDetailsPageComponent
                      key={props.match.params.id}
                      addToCart={this.addToCart.bind(this)}
                      selectedCurrency={this.state.selectedCurrency}/>
                 )}
              />
              <Route exact path="/cart" render={() => (
                 <CartComponent
                     cart={this.state.cart}
                     addToCart={this.addToCart.bind(this)}
                     removeFromCart={this.removeFromCart.bind(this)}
                     updateCartItemQuantity={this.updateCartItemQuantity.bind(this)}
                     updateCartItemAttributes={this.updateCartItemAttributes.bind(this)}
                     selectedCurrency={this.state.selectedCurrency}
                 />)
              }
              />
              <Route exact path="/:category" render={(props) => (
                <ProductListingPageComponent
                  key={props.match.params.category}
                  addToCart={this.addToCart.bind(this)}
                  selectedCurrency={this.state.selectedCurrency}
                />)}
              />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
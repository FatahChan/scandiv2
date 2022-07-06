import React, {Component} from 'react';
import CartItemComponent from "./CartItem/CartItem.Component";

class CartComponent extends Component {
  render() {
    return (
        <div>
          <div></div>
            <div>
              {this.props.cart.map((cartItem) => (
              <CartItemComponent
                  key={JSON.stringify(cartItem)}
                  cartItem={cartItem}
                  selectedCurrency={this.props.selectedCurrency}
                  updateCartItemQuantity={this.props.updateCartItemQuantity}
                  updateCartItemAttributes={this.props.updateCartItemAttributes}
                  removeFromCart={this.props.removeFromCart}
              />))}
            </div>
          <div></div>
        </div>
    );
  }
}

export default CartComponent;
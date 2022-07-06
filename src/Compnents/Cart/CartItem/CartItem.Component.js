import React, {PureComponent} from 'react';
import CartItemInfoComponent from "./CartItemInfo/CartItemInfo.Component";
import CartItemCounterComponent from "./CartItemCounter/CartItemCounter.Component";
import CartItemCarouselComponent from "./CartItemCarousel/CartItemCarousel.Component";

class CartItemComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }
  _updateAttribute(attribute, value) {
    let attributes = this.props.cartItem.attributes;
    console.log(attributes);
    console.log(attribute)
    attributes[attribute] = value;
    this.props.updateCartItemAttributes(this.props.cartItem, attributes);
  }
  render() {
    if(this.state.isLoading) { return <div>load</div>; }
    return (
        <div>
          <CartItemInfoComponent
            product={this.props.cartItem.product}
            attributes={this.props.cartItem.attributes}
            selectedCurrency={this.props.selectedCurrency}
            updateAttributes={this._updateAttribute.bind(this)}
          />
          <CartItemCounterComponent
            quantity={this.props.cartItem.quantity}
            updateCartItemQuantity={this.props.updateCartItemQuantity}
          />
          <CartItemCarouselComponent gallery={this.props.cartItem.product.gallery}/>
        </div>
    );
  }
}

export default CartItemComponent;
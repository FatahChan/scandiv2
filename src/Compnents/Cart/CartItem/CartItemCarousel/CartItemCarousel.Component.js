import React, {PureComponent} from 'react';
import "./CartItemCarousel.css"
class CartItemCarouselComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }
  render() {
    return (
        <div className="cart-item-carousel">
          <div className="cart-item-carousel-left">&#60;</div>
          <img src={this.props.gallery[this.state.index]}/>
          <div className="cart-item-carousel-right">&#62;</div>
        </div>
    );
  }
}

export default CartItemCarouselComponent;
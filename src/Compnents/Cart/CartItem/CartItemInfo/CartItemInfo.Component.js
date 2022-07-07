import React, {PureComponent} from 'react';
import CartItemAttributeDetailsComponent from "./AttributesDetails/CartItemAttributeDetails.Component";
import "./CartItemInfo.css"
class CartItemInfoComponent extends PureComponent {


  render() {
    const price = this.props['product']['prices'].filter(price => price.currency.label === this.props['selectedCurrency'])[0];
    return (
        <div className="cart-item-info">
          <div className='cart-brand-label'>{this.props.product.brand}</div>
          <div className='cart-name-label'>{this.props.product.name}</div>

          <div className="cart-attributes">
            <div className="cart-label">Price:</div>
            <div className="cart-price">{price.currency.symbol}{price.amount}</div>
            {

              this.props.product.attributes.map((attribute) => (
                  <CartItemAttributeDetailsComponent
                      key={JSON.stringify(this.props.attributes[attribute.name])}
                      updateAttributes={this.props.updateAttributes}
                      attributes={attribute}
                      selectedAttributes={this.props.attributes}
                  />))
            }
          </div>
        </div>
    );
  }
}

export default CartItemInfoComponent;
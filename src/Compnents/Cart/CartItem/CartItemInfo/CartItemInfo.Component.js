import React, {PureComponent} from 'react';
import CartItemAttributeDetailsComponent from "./AttributesDetails/CartItemAttributeDetails.Component";

class CartItemInfoComponent extends PureComponent {


  render() {
    const price = this.props['product']['prices'].filter(price => price.currency.label === this.props['selectedCurrency'])[0];
    return (
        <div>
          <div className='brand-label'>{this.props.product.brand}</div>
          <div className='name-label'>{this.props.product.name}</div>
          <div className="label">Price:</div>
          <div className="price">{price.currency.symbol}{price.amount}</div>
          <div className="attributes">
            {

              this.props.product.attributes.map((attribute) => (
                  <CartItemAttributeDetailsComponent
                      key={JSON.stringify({attribute: attribute.name, selected: this.props.attributes[attribute.name]})}
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
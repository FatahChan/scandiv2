import React, {PureComponent} from 'react';
import AttributeDetailsComponent from "./AttributesDetails/AttributeDetails.Component";

class ProductInfoComponent extends PureComponent {
  render() {
    return (
        <div>
          <div>{this.props.product.brand}</div>
          <div>{this.props.product.name}</div>

          <AttributeDetailsComponent
            type={this.props.product.attributes[0].type}
            items={this.props.product.attributes[0].items}
            name={this.props.product.attributes[0].name}
            selectedAttributes={this.props.selectedAttributes}
            updateAttributes={this.props.updateAttributes}
          />
          <div>{this.props.price.currency.symbol}{this.props.price.amount}</div>
          <div onClick={this.props.addToCart}>ADD TO CART</div>
        </div>
    );
  }
}

export default ProductInfoComponent;
import React, {PureComponent} from 'react';
import "./CartItemAttributeDetails.css"
class CartItemAttributeDetailsComponent extends PureComponent {
  render() {
    const {name, type, items} = this.props.attributes;
    let attributeOptions;
    if (type === 'text') {
      attributeOptions = items.map((item)=>(
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(name, item.value)}
                  className={`cart-text-attribute ${item.value === this.props.selectedAttributes[name]? 'cart-text-attribute-selected': ''}`}
              >
                {item.value}
              </div>
            ))
    }else if(type === 'swatch') {
      attributeOptions =items.map((item) => (
          <div
              key={item.id}
              onClick={() => this.props.updateAttributes(name, item.value)}
              className={"cart-swatch-attribute-container " + (item.value === this.props.selectedAttributes[name] ? 'cart-swatch-attribute-selected' : '')}
          >
            <div className="cart-swatch-attribute" style={{backgroundColor: item.value}}></div>
          </div>
      ))
    }
    return (
        <>
          <div className="cart-label">{name}:</div>
          <div className="cart-attribute">{attributeOptions}</div>
        </>
    );
  }
}

export default CartItemAttributeDetailsComponent;
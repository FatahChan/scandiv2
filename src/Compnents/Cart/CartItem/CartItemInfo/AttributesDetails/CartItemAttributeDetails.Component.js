import React, {PureComponent} from 'react';
import "./CartItemAttributeDetails.css"
class CartItemAttributeDetailsComponent extends PureComponent {
  render() {
    const {name, type, items} = this.props.attributes;
    const attributeOptions =
        type === 'text'?
            items.map((item)=>(
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(name, item.value)}
                  className={`text-attribute ${item.value === this.props.selectedAttributes[name]? 'text-attribute-selected': ''}`}
              >
                {item.value}
              </div>
            )):
            items.map((item)=> (
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(name, item.value)}
                  className={"swatch-attribute-container " + (item.value === this.props.selectedAttributes[name]? 'swatch-attribute-selected': '')}
              >
                <div className="swatch-attribute" style={{backgroundColor: item.value}}></div>
              </div>
            ))
    return (
        <>
          <div className="label">{name}:</div>
          <div className="attribute">{attributeOptions}</div>
        </>
    );
  }
}

export default CartItemAttributeDetailsComponent;
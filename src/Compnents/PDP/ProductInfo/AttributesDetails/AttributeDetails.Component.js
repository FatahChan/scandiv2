import React, {Component} from 'react';

class AttributeDetailsComponent extends Component {
  render() {
    const type = this.props.type
    const items =
        type === 'text'?
            this.props.items.map((item, i)=>(
              <div
                  key={i}
                  onClick={() => this.props.updateAttributes(this.props.name, item.value)}
                  className={`text-attribute ${item.value === this.props.selectedAttributes[this.props.name]? 'text-attribute-selected': ''}`}
              >
                {item.value}
              </div>
            )):
            this.props.items.map((item, i)=> (
              <div
                  onClick={() => this.props.updateAttributes(this.props.name, item.value)}
                  className={item.value === this.props.selectedAttributes[this.props.name]? 'swatch-attribute-selected': ''}
                  key={i}
              >
                <div className="swatch-attribute" style={{backgroundColor: item.value}}></div>
              </div>
            ))
    return (
        <div>
          {/*  attributes:{*/}
          {/*  id: "",*/}
          {/*  name: "",*/}
          {/*  type: "",*/}
          {/*  items:{*/}
          {/*  displayValue:"",*/}
          {/*  value: "",*/}
          {/*  id: ""*/}
          {/*}*/}
          {/*},*/}
          <div>{this.props.name}:</div>
          <div>{items}</div>
        </div>
    );
  }
}

export default AttributeDetailsComponent;
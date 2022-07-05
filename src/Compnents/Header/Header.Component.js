import React, {PureComponent} from 'react';
import {getCategories} from "../../BackendCalls/getCategories";
import {getCurrencies} from "../../BackendCalls/getCurrencies";

class HeaderComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [{label: "", symbol: ""}]
    }
  }
  componentDidMount() {
    getCategories().then( (res) => {
      this.setState({categories: res})
    })
    getCurrencies().then((res)=>{
      this.setState({currencies: res})
    })
  }


  render() {
    return (
        <div>
          <div className="left-header">
          {this.state['categories'].map((category, i) => (
              <div key={i} className="category-selector-header">{category}</div>
          ))}
          </div>
          <div className="middle-header">
          </div>
          <div className="right-header">
            <div className="currency-selector-header"></div>
            <div className="cart-header"></div>
          </div>
        </div>
    );
  }
}

export default HeaderComponent;
import React, {PureComponent} from 'react';
import ProductCardComponent from "./ProductCard/ProductCard.Component";
import {getCategory} from "../../BackendCalls/getCategory";
import {withRouter} from "react-router-dom";

class ProductListingPageComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }

  }
  componentDidMount() {
    getCategory(this.props['match']['params']['category']).then((res)=>{
      this.setState({products: res})
    })
  }

  render() {
    const ProductCards = this.state['products'].map((product, i) => (
        <ProductCardComponent
            key={i}
            addToCart={this.props.addToCart}
            id={product.id}
            selectedCurrency={this.props.selectedCurrency}
        />
    ))
    return (
        <div>
          {ProductCards}
        </div>
    );
  }
}

export default withRouter( ProductListingPageComponent);
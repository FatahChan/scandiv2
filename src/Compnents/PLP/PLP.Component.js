import React, {PureComponent} from 'react';
import ProductCardComponent from "./ProductCard/ProductCard.Component";
import {getCategory} from "../../BackendCalls/getCategory";
import {withRouter} from "react-router-dom";
import "./PLP.css"
class ProductListingPageComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      products: [],
      category: ""

    }
  }
  componentDidMount() {
    getCategory(this.props['match']['params']['category']).then((res)=>{
      this.setState({products: res, category: this.props['match']['params']['category'], isLoading: false})
    })
  }

  render() {
    if (this.state['isLoading']) { return <div>Loading...</div> }
    const ProductCards = this.state['products'].map((product) => (
        <ProductCardComponent
            key={JSON.stringify(product)}
            id={product.id}
            name={product.name}
            brand={product.brand}
            prices={product.prices}
            gallery={product.gallery}
            getCart={this.props.getCart}
            setCart={this.props.setCart}
            getSelectedCurrency={this.props.getSelectedCurrency}
        />
    ))
    return (
        <div>
          <div className="product-list-category-name">{this.state.category}</div>
          <div className="product-list" key={this.state.category}>
            {ProductCards}
          </div>
        </div>
    );
  }
}

export default withRouter( ProductListingPageComponent);
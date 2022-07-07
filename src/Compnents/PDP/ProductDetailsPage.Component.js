import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ProductCarouselComponent from "./ProductCarousel/ProductCarousel.Component";
import ProductInfoComponent from "./ProductInfo/ProductInfo.Component";
import {getProduct} from "../../BackendCalls/getProduct";
import "./ProductDetailsPage.css"
class ProductDetailsPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: {},
      attributes: {},
      price: {}
    }
  }
  componentDidMount() {
    getProduct(this.props['match']['params'].id).then((res) => {
      let prices = res['product']['prices'].slice()
      prices = prices.filter((price)=> {
        return price.currency.label === this.props.selectedCurrency
      })
      const price = prices[0];
      this.setState({
        product: res['product'],
        attributes: res['attributes'],
        price: price,
        isLoading: false
      })
    })
  }
  _addToCart(){
    this.props.addToCart({product: this.state['product'], attributes: JSON.parse(JSON.stringify(this.state['attributes']))})
  }
  updateAttributes(attribute, value) {
    let currentAttributes = Object.assign(this.state['attributes'])
    currentAttributes[attribute] = String(value)
    this.setState({attributes: currentAttributes})
  }
  render() {
    if (this.state['isLoading']) { return <div>Loading...</div> }
    return (
        <div className='product-details-page'>
          <ProductCarouselComponent
              gallery={this.state['product']['gallery']}
          />
          <ProductInfoComponent
              product={this.state['product']}
              price={this.state['price']}
              selectedAttributes={this.state.attributes}
              addToCart={this._addToCart.bind(this)}
              updateAttributes={this.updateAttributes.bind(this)}
          />
        </div>
    );
  }
}

export default withRouter(ProductDetailsPageComponent);
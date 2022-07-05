import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import ProductCarouselComponent from "./ProductCarousel/ProductCarousel.Component";
import ProductInfoComponent from "./ProductInfo/ProductInfo.Component";
import {getProduct} from "../../BackendCalls/getProduct";

class ProductDetailsPageComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: "",
        name: "",
        brand: "",
        description: "",
        inStock: true,
        gallery: [""],
        category: "",
        attributes:[{
          id: "",
          name: "",
          type: "",
          items:[{
            displayValue:"",
            value: "",
            id: ""
          }]
        }],
        prices:[{
          currency: {
            label: "",
            symbol: ""
          },
          amount: 0
        }]
      },
      attributes: {size: 0},
      price: {currency:{label: "", symbol: ""}, amount:0}
    }
  }
  componentDidMount() {
    getProduct(this.props['match']['params'].id).then((res) => {
      let prices = res.product.prices.slice()
      prices = prices.filter((price)=> {
        return price.currency.label === this.props.selectedCurrency
      })
      const price = prices[0];
      this.setState({
        product: res.product,
        attributes: res.attributes,
        price: price
      })
    })
  }
  _addToCart(){
    this.props.addToCart(JSON.stringify({id:this.state['product'].id, attributes: this.state['attributes']}))
  }
  updateAttributes(name, value){
    let currAttributes = JSON.parse(JSON.stringify(this.state['attributes']))
    this.setState({attributes: currAttributes})
  }
  render() {
    return (
        <div>
          <ProductCarouselComponent
              gallery={this.state['product']['gallery']}
          />
          <ProductInfoComponent
              product={this.state['product']}
              addToCart={this._addToCart.bind(this)}
              price={this.state['price']}
              selectedAttributes={this.state['attributes']}
              updateAttributes={this.updateAttributes.bind(this)}
          />
        </div>
    );
  }
}

export default withRouter(ProductDetailsPageComponent);
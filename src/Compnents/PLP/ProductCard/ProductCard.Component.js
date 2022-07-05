import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import {addToCart} from "../../../Assets/addToCart";
import {getProduct} from "../../../BackendCalls/getProduct";
import "./ProductCard.css"
class ProductCardComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: "",
        name: "",
        brand: "",
        inStock: true,
        gallery: [""],
        category: "",
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
    getProduct(this.props.id).then((res) => {
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
  render(){
    return (
        <div className="product-card" key={this.props.id}>
          <Link style={{textDecoration: 'none', "color": "black"}} to={`/product/${this.props.id}`}>
            <div className="card">
              <img alt={this.state['product'].name} src={this.state['product'].gallery[0]}/>
              <div className="card-text">
                <div className="brand-name-card">{this.state['product'].brand} {this.state['product'].name}</div>
                <div className="price-card">
                  {this.state['price'].currency.symbol}{this.state['price'].amount}
                </div>
              </div>
            </div>
          </Link>
          <div onClick={this._addToCart.bind(this)} className="card-add-button">
            <div style={{backgroundColor: "black"}} className="cart-icon">{addToCart}</div>
          </div>
        </div>
    );
  }
}

export default ProductCardComponent;
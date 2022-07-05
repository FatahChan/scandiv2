import React, {PureComponent} from 'react';

class ProductCarouselComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }
  render() {
    const column = this.props.gallery.map((url, i) =>(
      <img src={url} key={i} alt={`#${i}`}/>
    ))
    return (
        <div>
          <div>{column}</div>
          <div><img src={this.props.gallery[this.state['index']]} alt={`big #${this.state['index']}`}/></div>
        </div>
    );
  }
}

export default ProductCarouselComponent;
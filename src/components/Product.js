import React, {Component} from 'react';

class Product extends Component {
  render() {
    const {product} = this.props;
    return (
        <div className={"item-product"}>
          <div className="item-product__order">{product.order}</div>
          <div className="item-product__name">{product.name}</div>
          <div className="item-product__description">{product.description}</div>
          <div className={`item-product__${product.isEnough}`}>{product.price} R</div>
        </div>
    );
  }
}

export default Product;

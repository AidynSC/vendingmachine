import React, {Component} from 'react';
import Product from './Product'
import {connect} from 'react-redux'

class AllProducts extends Component {
  render() {
    return (
        <div className="vending__product-list">
          {this.props.products.map( (product,i) =>
              <Product product={product} key={i}/>
          )}
        </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    products: store.products
  }
}

export default connect(mapStateToProps)(AllProducts)

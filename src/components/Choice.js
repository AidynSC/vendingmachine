import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CHOOSEPRODUCT, REFRESHMACHINE} from '../redux/creators';

class Choice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: '',
      check: false,
      number: false,
      isAvailable: false,
      enoughMoney: false,
    };
  }

  chooseOrder = (e) => {
    this.setState({order: e.target.value});
  };

  checkOrder = (e) => {
    e.preventDefault();
    this.setState({
      check: true,
      number: false,
      isAvailable: false,
    });
    const order = parseInt(this.state.order);

    const isNumber = () => !isNaN(order);

    const validOrder = () => {
      return order > 0 && this.props.products.length >= order;
    };

    if (isNumber() && !validOrder()) {
      this.setState({
        check: true,
        number: true,
        isAvailable: false,
      });
    }

    if (isNumber() && validOrder()) {
      this.props.productChosen(order);

      this.setState({
        check: true,
        number: true,
        isAvailable: true,
      });
    }
  };

  takeProduct = () => {
    this.props.refreshMachine();
    this.setState({
      order: '',
      check: false,
      number: false,
      isAvailable: false,
      enoughMoney: false,
    });
  };

  render() {
    return (
        <div className="choice__container">
          <div className="container__text">
            {!this.state.check && <div>Choose product...</div>}
            {this.state.check && !this.state.number && <div>
              Choice must be a number!
            </div>}
            {this.state.check && this.state.number && !this.state.isAvailable &&
            <div>
              Enter the correct number!
            </div>}
            {this.state.check && this.state.number && this.state.isAvailable &&
            !this.props.userMoneyIsEnough &&
            <div>
              Not enough money
            </div>}
            {this.state.check && this.state.number && this.state.isAvailable &&
            this.props.userMoneyIsEnough &&
            <div>
              Success
            </div>}
          </div>

          <form onSubmit={this.checkOrder}>
            <input type="text" value={this.state.order}
                   onChange={this.chooseOrder}
                   placeholder="< ..."
            />
          </form>

          <div className="container__result">
            {this.state.check &&
            this.state.number && this.state.isAvailable &&
            this.props.userMoneyIsEnough && this.props.change &&
            <div>Take your product and change!</div>}
          </div>

          <div className="container__change">
            {this.state.check && this.state.number && this.state.isAvailable &&
            this.props.userMoneyIsEnough && this.props.change &&
            <div>
              {this.props.change.map(
                  (c, i) => <div className="change__item"
                                 key={i}>{c[0]} R: {c[1]} coins</div>)}
              {this.props.products.map((p, i) => {
                if (p.order === Number(this.state.order)) {
                  return <div className="change__chosenProduct"
                              onClick={this.takeProduct}
                              key={i}>{p.order}. {p.name} - {p.price} R</div>;
                }
              })}
            </div>}
          </div>
        </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    products: store.products,
    userMoneyIsEnough: store.userMoneyIsEnough,
    change: store.change,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productChosen: (order) => {
      dispatch(CHOOSEPRODUCT(order));
    },
    refreshMachine: () => {
      dispatch(REFRESHMACHINE());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Choice);

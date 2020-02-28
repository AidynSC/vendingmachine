import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TOTALMONEY} from '../redux/creators';

class Banknotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      money: '',
      total: 0,
      check: false,
      number: false,
      isAvailable: false,
    };
  }

  addingBanknotes = (e) => {
    this.setState({money: e.target.value});
  };

  checkBanknotes = (e) => {
    e.preventDefault();
    this.setState({
      check: true,
      number: false,
      isAvailable: false,
    });
    const bill = parseInt(this.state.money);

    const isNumber = () => !isNaN(bill);

    const validNumber = () => {
      return bill > 0 && [50, 100, 200, 500, 1000].includes(bill);
    };

    if (isNumber() && !validNumber()) {
      this.setState({
        check: true,
        number: true,
        isAvailable: false,
      });
    }

    if (isNumber() && validNumber()) {
      this.props.moneyInserted(this.state.total + bill);
      this.setState({
        money: '',
        check: true,
        number: true,
        isAvailable: true,
        total: this.state.total + bill,
      });
    }
  };


  render() {
    return (
        <div className="banknotes__container">
          <div className="container__text">
            {!this.state.check && <div>Insert banknotes...</div>}
            {this.state.check && !this.state.number && <div>
              Banknote must be a number!
            </div>}
            {this.state.check && this.state.number && !this.state.isAvailable &&
            <div>
              Unknown banknote!
            </div>}
            {this.state.number && this.state.isAvailable && <div>
              Inserted money: {this.props.userMoney} R
            </div>}
          </div>
          <form onSubmit={this.checkBanknotes}>
            <input id="inputId" type="text" value={this.state.money}
                   onChange={this.addingBanknotes}
                   placeholder="< ..."
            />
          </form>
          <div className="container__documentation">
            Available banknotes: 50, 100, 200, 500 or 1000 R. <br/>
            The machine gives change <br/>
            in 1, 2, 5 and 10 R coins.
          </div>
        </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userMoney: store.userMoney
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moneyInserted: (money) => {
      dispatch(TOTALMONEY(money));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Banknotes);

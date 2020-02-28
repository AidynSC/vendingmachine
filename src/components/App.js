import React, {Component} from 'react';
import AllProducts from './AllProducts';
import Banknotes from './Banknotes';
import Choice from './Choice';
import '../styles/styles.scss';

class App extends Component {
  render() {
    return (
        <div className="vending">
          <div className="vending__body">
            <div className="vending__product">
              <AllProducts/>
            </div>
          </div>

          <div className="vending__inputs">
            <div className="vending__banknotes">
              <Banknotes/>
            </div>
            <div className="vending__choice">
              <Choice/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;

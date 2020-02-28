import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './redux/reducer';
import App from './components/App';
import {Provider} from 'react-redux';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app'));

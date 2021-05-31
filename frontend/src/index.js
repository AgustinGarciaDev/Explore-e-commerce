import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './redux/reducers/mainReducer'
import "./Style/munoz.css"

const miStore = createStore(mainReducer, applyMiddleware(thunk))

ReactDOM.render(

  <Provider store={miStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/styles/App.scss";
import store from './redux/store';
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
        {/*<h1>Hi</h1>*/}
    </Provider>
, 

document.getElementById('root'));
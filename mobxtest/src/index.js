import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import rootStore from './store/rootStore'
import DevTools from 'mobx-react-devtools'
configure({
    enforceActions: 'observed'
})
ReactDOM.render( 
    <Provider store={rootStore}><div><App /> <DevTools /></div></Provider>
   , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

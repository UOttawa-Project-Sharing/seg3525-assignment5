import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.scss';
import App from './App.jsx'
import {HashRouter} from "react-router";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {Provider} from "react-redux";
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
      </Provider>
  </StrictMode>,
)

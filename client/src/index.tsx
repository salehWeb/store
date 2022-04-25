import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer'
import {initalState} from './context/initalState'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode> 
    <Router>
      <StateProvider initalState={initalState} reducer={reducer}>
      <App />
      </StateProvider>
    </Router>
    </React.StrictMode>
);


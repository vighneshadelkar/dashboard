import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GroupingProvider } from './components/ContextApi/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GroupingProvider>

      <App />
    </GroupingProvider>
  </React.StrictMode>
);

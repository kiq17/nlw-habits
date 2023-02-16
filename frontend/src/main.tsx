import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GraphOrListProvider, graphOrListContext } from "./contexts/GraphOrList";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GraphOrListProvider>
      <App />
    </GraphOrListProvider>
  </React.StrictMode>
)

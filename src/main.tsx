import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toast } from './lib/Toast.tsx'
import "leaflet/dist/leaflet.css"
// import ChartRender from './ChartRender.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ChartRender /> */}
      <App />
      <Toast />
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketContextProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='463638957160-fd1oul1v1q7ienf7r8uol6en417gdsiu.apps.googleusercontent.com'>
    <BrowserRouter>
      <Provider store={store}>
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)

import 'virtual:svg-icons-register'
import './index.css'
import 'virtual:uno.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
    <App />
  </BrowserRouter>,
)

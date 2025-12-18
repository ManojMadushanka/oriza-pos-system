import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Bootstrap මුලින්ම (Styles පටලැවෙන්නේ නැති වෙන්න)
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
// 2. අපේ Tailwind CSS අන්තිමට (එතකොට මේක තමයි රජ වෙන්නේ)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
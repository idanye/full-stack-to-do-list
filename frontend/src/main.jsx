import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TasksContextProvider } from './context/TaskContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </StrictMode>,
)

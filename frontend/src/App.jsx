import Home from "./pages/Home"
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditTask from "./pages/EditTask"

function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/edit/:id" element={<EditTask/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

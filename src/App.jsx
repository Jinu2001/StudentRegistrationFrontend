import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage' 

function App() {

  return (
    <>
      
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        </BrowserRouter>
         
          
      
    </>
  )
}

export default App

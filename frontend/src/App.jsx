import Signup from './pages/signup';
import { Routes, Route } from 'react-router';
import Home from './pages/home';
import Login from './pages/login';
import AiGeneration from './pages/aiAliases'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />  
        <Route path="/login" element={<Login/>} />
        <Route path='/smart-urls' element={<AiGeneration/>}/>
      </Routes>
      
    </>
  )
}

export default App

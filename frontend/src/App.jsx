import Signup from './pages/signup';
import { Routes, Route } from 'react-router';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />  
        <Route path="/login" element={<Login/>} />
      </Routes>
      
    </>
  )
}

export default App

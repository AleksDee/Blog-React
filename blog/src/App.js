import { useState, useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/UI/navbar/Navbar';
import './styles/App.css'
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;

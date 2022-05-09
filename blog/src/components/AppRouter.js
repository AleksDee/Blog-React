import React, {useContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import Login from '../pages/Login'
import { AuthContext } from '../context'

export default function AppRouter() {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  return (
    <>
      {
      isAuth 
        ? 
        <Routes>
        <Route path="/about" element={< About/>}/>
        <Route exact path="/posts" element={< Posts/>}/>
        <Route exact path="/posts/:id" element={< PostIdPage/>}/>
        <Route exact path="/login" element={< Login/>}/>
        {/* {
          routes.map(route => 
            <Route exact={route.exact} path={route.path} element={route.element}/>
          )
        } */}
        <Route path="*" element={<Posts/>}/>
      </Routes>
        :
      <Routes>
        <Route exact path="/login" element={< Login/>}/>
        <Route path="*" element={<Login/>}/>
      </Routes>
      } 
    </>
  )
}

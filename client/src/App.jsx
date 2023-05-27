import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { Homepage } from './pages/Homepage';
import { PostPage } from './pages/PostPage';
import { AddBlog } from './pages/AddBlog';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  //using user variable to test design for logged in users and for having no users
  //if we have a logged in user, certain pages like register/login will redirect to homepage. This is because if we already have a user logged in, it makes no sense to show them these pages.
  //similarly, addBlog page will only be showed to users that are logged in to prevent anonymous posts.

  const user = false;

  return (
    <>
      <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={ <Homepage/> }
          />
          <Route 
            path='register' 
            element={ user ? <Homepage/> : <Register/> }
          />
          <Route 
            path='login' 
            element={ user ? <Homepage/> : <Login/> }
          />
          <Route 
            path='post/:id' 
            element={ <PostPage/> }
          />
          <Route 
            path='account' 
            element={ user ? <Account/> : <Login/> }
          />
          <Route 
            path='addblog' 
            element={ user ? <AddBlog/> : <Register/> }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

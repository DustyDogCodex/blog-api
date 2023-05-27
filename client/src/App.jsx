import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { Homepage } from './pages/Homepage';
import { PostPage } from './pages/PostPage';
import { AddBlog } from './pages/AddBlog';
import { Account } from './pages/Account';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <Navigation/>
      <Login/>
    </>
  )
}

export default App

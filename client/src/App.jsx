import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { Homepage } from './pages/Homepage';
import { PostPage } from './pages/PostPage';
import { AddBlog } from './pages/AddBlog';

function App() {
  return (
    <>
      <Navigation/>
      <AddBlog/>
    </>
  )
}

export default App

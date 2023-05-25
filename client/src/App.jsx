import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { Homepage } from './pages/Homepage';
import { PostPage } from './pages/PostPage';

function App() {
  return (
    <>
      <Navigation/>
      <PostPage/>
    </>
  )
}

export default App

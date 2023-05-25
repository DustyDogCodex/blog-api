import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { Homepage } from './pages/Homepage';

function App() {
  return (
    <>
      <Navigation/>
      <Homepage />
    </>
  )
}

export default App

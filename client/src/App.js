import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages'
import { Header } from './components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

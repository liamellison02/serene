import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Dashboard, AuthorizeTwitter } from './pages'
import { Header } from './components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/authorize/twitter" element={<AuthorizeTwitter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { ContextProvider } from './components/Context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import AuthControl from './components/AuthControl';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Navbar />
          <div id="main-container">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<AuthControl><Chat /></AuthControl>} />
            </Routes>
          </div>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;

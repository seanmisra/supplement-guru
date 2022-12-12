import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Header/>
      
      <Routes> 
        <Route path='/adminPanel' element={<Admin/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

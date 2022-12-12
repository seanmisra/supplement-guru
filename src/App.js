import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import { useEffect, useState } from 'react';

function App() {

  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    const getSupplements = async () => {
      const supplementsFromServer = await fetchSupplements()
      setSupplements(supplementsFromServer);
    }

    getSupplements();
  }, [])

  const fetchSupplements = async () => {
    const res = await fetch('http://localhost:5000/supplements')
    const data = await res.json()

    return data;
  }

  const fetchSupplement = async (id) => {
    const res = await fetch(`http://localhost:5000/supplements/${id}`)
    const data = await res.json()

    return data;
  } 

  const addSupplement = async(supplement) => {
    const res = await fetch('http://localhost:5000/supplements', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(supplement)
    })

    const data = await res.json()
    setSupplements([...supplements, data])
  }

  const editSupplement = async(supplement) => {
    // update in memory
    const res = await fetch(`http://localhost:5000/supplements/${supplement.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(supplement)
    });

    const data = await res.json()

    // update locally
    setSupplements(
      supplements.map((thisSupp) => 
        thisSupp.id === supplement.id ? supplement : this.supp
      )
    )
  }

  return (
    <Router>
      <Header/>
      
      <Routes> 
        <Route path='/adminPanel' element={<Admin onAdd={addSupplement} />}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
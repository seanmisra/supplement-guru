import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import { useEffect, useState } from 'react';
import Home from './components/Home'

function App() {

  const [supplements, setSupplements] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendationObj, setRecommendationObj] = useState(null);

  useEffect(() => {
    const getSupplements = async () => {
      const supplementsFromServer = await fetchSupplements()
      setSupplements(supplementsFromServer);

      console.log('supplementsFromServer');
      console.log(supplementsFromServer);
      fetchKeywords(supplementsFromServer);
    }

    getSupplements();
  }, [])

  const fetchSupplements = async () => {
    const res = await fetch('http://localhost:5000/supplements')
    const data = await res.json()

    fetchKeywords();
    return data;
  }

  const fetchSupplement = async (id) => {
    const res = await fetch(`http://localhost:5000/supplements/${id}`)
    const data = await res.json()

    return data;
  } 

  const fetchKeywords = async (supplementsFromServer) => {
    const keywords = [];
    if (supplementsFromServer) {
      supplementsFromServer.forEach(thisSupp => {
        keywords.push(...thisSupp.tags)
      })
  
      let uniqueKeywords = [...new Set(keywords)]
      uniqueKeywords.sort()
      setKeywords(uniqueKeywords);
    }
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
    console.log('supplement');
    console.log(supplement);
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
        thisSupp.id === supplement.id ? supplement : thisSupp
      )
    )
  }

  const deleteTask = async (id) => {
    console.log('deleteTask');
    console.log(id);
    await fetch(`http://localhost:5000/supplements/${id}`, {
      method: 'DELETE'
    })

    setSupplements(supplements.filter((supplement) => supplement.id !== id));
  }

  const getRecommendation = (keywords) => {
    const supplementScores = {};

    supplements.forEach((supplementObj) => {
      const sharedKeywords = supplementObj.tags.filter(tag => keywords.includes(tag));
      const score = sharedKeywords.length;
      supplementScores[supplementObj.name] = score;
    });

    const recommendation = Object.keys(supplementScores).reduce((a, b) => supplementScores[a] > supplementScores[b] ? a : b);
    const recommendationObj = supplements.find(supp => supp.name.toLowerCase() === recommendation.toLowerCase())

    setRecommendationObj(recommendationObj);
  }

  return (
    <Router>      
      <Routes> 
        <Route path='/' exact element={<Home keywords={keywords} getRecommendation={getRecommendation} recommendationObj={recommendationObj} />}>
        </Route>

        <Route path='/adminPanel' element={<Admin allSupplements={supplements}
         onDelete={deleteTask} onEdit={editSupplement} onAdd={addSupplement} />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

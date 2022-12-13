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
    const getSupplementData = async () => {
      const supplementsFromServer = await fetchSupplements()
      setSupplements(supplementsFromServer);

      const keywordsFromServer = await fetchKeywords();
      setKeywords(keywordsFromServer);
    }

    getSupplementData();
  }, [])

  const fetchSupplements = async () => {
    const res = await fetch('http://localhost:8080/api/allSupplements');
    const data = await res.json();
    return data;
  }

  // const fetchSupplement = async (id) => {
  //   const res = await fetch(`http://localhost:5000/supplements/${id}`)
  //   const data = await res.json()

  //   return data;
  // } 

  const fetchKeywords = async () => {
    const res = await fetch('http://localhost:8080/api/allKeywords');
    const data = await res.json();
    return data;
  }

  const addSupplement = async(supplement) => {
    console.log('add supplement');
    console.log(supplement);

    // update in DB
    const res = await fetch('http://localhost:8080/api/supplement', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(supplement)
    })

    const data = await res.json()
    //update locally
    setSupplements([...supplements, data])
  }

  const editSupplement = async(supplement) => {
    // update in DB
    const res = await fetch('http://localhost:8080/api/supplement', {
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
        thisSupp.name === supplement.name ? supplement : thisSupp
      )
    )
  }

  const deleteSupplement = async (id) => {
    await fetch(`http://localhost:8080/api/supplement/${id}`, {
      method: 'DELETE'
    })

    setSupplements(supplements.filter((supplement) => supplement._id !== id));
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

  const addHandler = (keyword) => {
     setKeywords(keywords.filter(kw => kw.toLowerCase() !== keyword.toLowerCase()));
  }

 const deleteHandler = (keyword) => {
    setKeywords([...keywords, keyword].sort());
  }

  return (
    <Router>      
      <Routes> 
        <Route path='/' exact element={<Home keywords={keywords} getRecommendation={getRecommendation}
         addHandler={addHandler} deleteHandler={deleteHandler} recommendationObj={recommendationObj} />}>
        </Route>

        <Route path='/adminPanel' element={<Admin allSupplements={supplements}
         onDelete={deleteSupplement} onEdit={editSupplement} onAdd={addSupplement} />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

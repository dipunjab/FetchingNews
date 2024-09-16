import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

//Function based components
function App(){
  const apikey = process.env.REACT_APP_NEWS_API 
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#048BA8'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News apikey={apikey} setProgress={setProgress} key={"general"} pageSize={5} country="us" category="general" />} />
            <Route exact path='/business' element={<News apikey={apikey} setProgress={setProgress} key={"business"} pageSize={5} country="us" category="business" />} />
            <Route exact path='/sports' element={<News apikey={apikey} setProgress={setProgress} key={"sports"} pageSize={5} country="us" category="sports" />} />
            <Route exact path='/entertainment' element={<News apikey={apikey} setProgress={setProgress} key={"entertainment"} pageSize={5} country="us" category="entertainment" />} />
            <Route exact path='/science' element={<News apikey={apikey} setProgress={setProgress} key={"science"} pageSize={5} country="us" category="science" />} />
            <Route exact path='/technology' element={<News apikey={apikey} setProgress={setProgress} key={"technology"} pageSize={5} country="us" category="technology" />} />
            <Route exact path='/health' element={<News apikey={apikey} setProgress={setProgress} key={"health"} pageSize={5} country="us" category="health" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App
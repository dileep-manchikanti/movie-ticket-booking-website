import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/mainComponent';

// import {fetch} from 'cross-fetch';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'fa716db22dmshbfc9d7bfcfa55cdp1f6addjsn05f1a6bd08e8'
// 	}
// };
// Initialize Firebase
function App(){
  
    return(
      <div>
        <BrowserRouter>
        <div className='App'>
          <Main />
        </div>
        </BrowserRouter>
      </div>
      
    );
}

export default App;

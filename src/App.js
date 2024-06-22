import React from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Weather Forecast App</h1>
      {/*call weather component */}
      <Weather />
    </div>
  )
}


export default App;
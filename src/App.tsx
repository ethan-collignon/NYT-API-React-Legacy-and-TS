import React from 'react';
import './App.css';
import NYT from './components/NYTFetch';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <h1>NY Times Search</h1>
     <NYT/>
    </div>
  );
}

export default App;

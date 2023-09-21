import React from 'react';
import Mask from '../components/Mask';
import img from '../../public/favicon.png'
import './App.less';

function App() {
  return (
    <div className="text-img">
      <img src={img}></img>
      <Mask imgs={[img, img]}/>
    </div>
  );
}

export default App;

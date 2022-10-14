import './App.css';
import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom/client';
import SliderField from './SliderField';
import Images from './ImageDisplay';



const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink style={isActive => ({
        fontWeight: isActive.isActive ? "bold" : "normal"
      })}
        exact to='/ProcessingParams'>Processing Params</NavLink></li>
      <li><NavLink style={isActive => ({
        fontWeight: isActive.isActive ? "bold" : "normal"
      })}
        exact to='/PowerSavingParams'>Power Saving Params</NavLink></li>
      <li><NavLink style={isActive => ({
        fontWeight: isActive.isActive ? "bold" : "normal"
      })}
        exact to='/Images'>Images</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Routes>
    <Route exact path='/ProcessingParams' element={<ProcessingParams />}></Route>
    <Route exact path='/PowerSavingParams' element={<PowerSavingParams />}></Route>
    <Route exact path='/Images' element={<Images />}></Route>
    <Route exact path='/' element={<Images />}></Route>
  </Routes>
);

const ProcessingParams = () => (
  <div className='processingParams'>
    <SliderField fieldName="saveIntermidiate" min="0" max="1" units="1" />
    <br />
    <SliderField fieldName="monitorSleepTime" min="1" max="600" units="1000000" />
    <br />
    <SliderField fieldName="detectionSleepTime" min="1" max="600" units="1000000" />
    <br />
    <SliderField fieldName="monitorUploadCount" min="2" max="30" units="1" />
    <br />
    <SliderField fieldName="detectionUploadCount" min="2" max="30" units="1" />
  </div>
);

const PowerSavingParams = () => (
  <div className='powerSavingParams'>
    <SliderField fieldName="threshold" min="1" max="255" units="1" />
    <br />
    <SliderField fieldName="movementPixelCount" min="1" max="200" units="1" />
    <br />
    <SliderField fieldName="ignorePixelCount" min="1" max="8" units="1" />
    <br />
    <SliderField fieldName="halfDilationKernelSize" min="1" max="6" units="1" />
    <br />
    <SliderField fieldName="halfErrodeKernelSize" min="1" max="6" units="1" />
  </div>
);



function App() {
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom/client';
import { model } from './Model'


class SliderField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fieldValue: this.GetModelValue() };
  }

  componentDidMount() {
    model.Listen(this.ModelUpdated);
  }

  GetModelValue = () => {
    var modelVal = model.GetField(this.props.fieldName);
    if (typeof modelVal === 'undefined')
    {
      modelVal = 0;
    }
    return modelVal / parseInt(this.props.units);
  };

  SetModelValue = (val) => {
    model.SetField(val * parseInt(this.props.units), this.props.fieldName);
  };

  ModelUpdated = () => {
    this.setState({ fieldValue: this.GetModelValue() });
  }

  handleSlide = e => {
    this.setState({ fieldValue: e.target.value });
    if (e.type == "change") {
      this.SetModelValue(e.target.value);
    }
  }

  sliderId = () => { return this.props.fieldName + "Slider"; };
  valueId = () => { return this.props.fieldName + "Value"; };

  render() {
    return <div>
      <h3>{this.props.fieldName} Entry</h3>
      <input type="range" id={this.sliderId()}
        name="points"
        min={this.props.min}
        max={this.props.max}
        value={this.state.fieldValue}
        onMouseMove={this.handleSlide}
        onChange={this.handleSlide}
      />
      <label id={this.valueId()} htmlFor={this.sliderId()}> {this.state.fieldValue} </label>
    </div>
  }
}




function App() {
  return (
    <div className="App">
        <SliderField fieldName="saveIntermidiate" min="0" max="1" units="1" />
        <SliderField fieldName="monitorSleepTime" min="1" max="600" units="1000000" />
        <SliderField fieldName="detectionSleepTime" min="1" max="600" units="1000000" />
        <SliderField fieldName="monitorUploadCount" min="2" max="30" units="1" />
        <SliderField fieldName="detectionUploadCount" min="2" max="30" units="1" />

        <SliderField fieldName="threshold" min="1" max="255" units="1" />
        <SliderField fieldName="movementPixelCount" min="1" max="200" units="1" />
        <SliderField fieldName="ignorePixelCount" min="1" max="8" units="1" />
        <SliderField fieldName="halfDilationKernelSize" min="1" max="6" units="1" />
        <SliderField fieldName="halfErrodeKernelSize" min="1" max="6" units="1" />
    </div>
  );
}

export default App;

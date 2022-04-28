// Components
import React from 'react';
import {Button} from 'react-bootstrap'
import Logo from './components/Welcome/Logo'
import Welcome from "./components/Welcome/Welcome"
import Context from "./components/Welcome/Context"
import RenderProps from "./components/Welcome/RenderProps"
import HOC from "./components/Welcome/HOC"
import Hooks from "./components/Welcome/Hooks"
// Styles
import './App.css';
	

function App() {
  function afterChangeCount(newCount) {
    console.log('New count', newCount);
  }
  var ref = React.createRef()
  return (
    <div className="App">
      <header className="App-header">
        <Logo/> 
        <Welcome name="EddieOnTheCode" afterChangeCount={afterChangeCount} innerRef={ref}/>
        <Button variant='success' onClick={() => {
          ref.current.focus();
        }}>Focus input from parent component</Button>
        <hr className="w-100" />
        <h3>Context</h3>
        <Context/>
        <hr className="w-100" />
        <h3>Render props</h3>
        <RenderProps/>
        <hr className="w-100" />
        <h3>HOC (Higher order component)</h3>
        <HOC/>
        <hr className="w-100" />
        <h3>Hooks</h3>
        <Hooks/>
      </header>
    </div>
  );
}

export default App;

// Components
import Logo from './components/Welcome/Logo'
import Welcome from "./components/Welcome/Welcome"
// Styles
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo/> 
        <Welcome name="EddieOnTheCode"/>
      </header>
    </div>
  );
}

export default App;

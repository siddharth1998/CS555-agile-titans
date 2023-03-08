import './App.css';
import ContractList from './components/ContractList';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Auth></Auth> */}
        <ContractList></ContractList>
      </div>
    </Router>
  );
}

export default App;

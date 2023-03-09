import './App.css';
import ContractList from './components/ContractList';
import Auth from './components/Auth';
import Issue from './components/Issue';
import { HashRouter as Router, Route, } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Auth} />
        <Route path="/contract" component={ContractList} />
        <Route path="/issue" component={Issue} />
      </div>
    </Router>
  );
}

export default App;

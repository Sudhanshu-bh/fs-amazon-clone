import { Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

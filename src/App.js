import { Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout';

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

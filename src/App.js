import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import Checkout from './Checkout';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;

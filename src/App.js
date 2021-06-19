import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './reusable/Header'
import Footer from './reusable/Footer';
import Home from './Home'
import Checkout from './Checkout';

function App() {
  return (
    <BrowserRouter>
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

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './home/Home'
import Checkout from './checkout/Checkout';
import Login from './login/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {

  // eslint-disable-next-line
  const [{ cart, user}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser)

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  // eslint-disable-next-line
  }, [])
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

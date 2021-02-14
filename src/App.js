import React ,{useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Header from './header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import {useStateValue} from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';
import Test from './test'
const promise = loadStripe(
  "pk_test_51IHrSNFmdbT1tZARNsaflggYHch3UdCouGPAPg9bHK4yGgNKAKuC8n6eL4Cu9lYMw9qIAWzwXX8oQ1SeequxiXzj00M6yb9Wgu"
);

function App() {
  const [{user} , dispatch] = useStateValue()
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log('this is User  -====>  ',authUser)
      if (authUser){
        dispatch({
          type:'SET_USER',
          user : authUser
        })
      }
      else{
        dispatch({
          type:'SET_USER',
          user : null
        })

      }
    })
  },[])
  return (
    <Router>
    <div className="app">
      <Switch>
        <Route path="/test">
          <Test/>
        </Route>
        <Route path="/checkout">    
          <Header/>  
          <Checkout/>
        </Route>
        <Route path="/orders">
            <Header/>
            <Orders/>
        </Route>
        <Route path = '/login'>
          
          <Login/>
        </Route>
        <Route path = '/payment'>
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route path="/">      
          <Header/>
          <Home/>
        </Route>
        
      </Switch>

    </div>
    </Router>
  );
}

export default App;

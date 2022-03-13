import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';
import Register from './pages/Register';

import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: 0
    }
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products/:category' element={<Products />} />
            <Route path='/products/:category/:productId' element={<Product />} />
            <Route path='/:productId' element={<Product />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';
import Register from './pages/Register';

import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';
import Dashboardhome from './pages/Dashboard/Admin/DashboardHome';
import Orders from './pages/Dashboard/Admin/Orders';
import AllProducts from './pages/Dashboard/Admin/AllProducts';
import EditProduct from './pages/Dashboard/Admin/EditProduct';
import Users from './pages/Dashboard/Admin/Users';
import CreateProduct from './pages/Dashboard/Admin/CreateProduct';
import PurchaseHistory from './pages/Dashboard/Admin/PurchaseHistory';

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
            <Route path='/dashboard/*' element={<Dashboard />} >
              <Route path="*" element={<Dashboardhome />} />
              <Route path="home" element={<Dashboardhome />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/:id" element={<EditProduct />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<PurchaseHistory />} />
              <Route path='createProduct' element={<CreateProduct />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;


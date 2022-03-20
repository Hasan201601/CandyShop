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
import { connect } from 'react-redux';
import { getTotals } from './redux/CartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Privateoutlet from './pages/Dashboard/Outlets/PrivateOutlet';
import Login from './pages/Login';
import AdminOutlet from './pages/Dashboard/Outlets/AdminOutlet';
import ReturnProducts from './pages/Dashboard/User/ReturnProducts';
import UpdateProfile from './pages/Dashboard/User/UpdateProfile';
import Purchase from './pages/Dashboard/User/PurchaseHistory';
import { setUser } from './redux/UserSlice';
import Checkout from './pages/Checkout';
import Myorders from './pages/Dashboard/User/MyOrders';
import CreateCategory from './pages/Dashboard/Admin/CreateCategory';


toast.configure();


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
            <Route path="/login" element={<Login />} />
            <Route path="/userDashboard/*" element={<Privateoutlet />} >
              <Route path="*" element={<Purchase />} />
              <Route path="purchaseHistory" element={<Purchase />} />
              <Route path="return" element={<ReturnProducts />} />
              <Route path="orders" element={<Myorders />} />
              <Route path="updateProfile" element={<UpdateProfile />} />
            </Route>
            <Route path='/dashboard/*' element={<AdminOutlet />}>
              <Route path="*" element={<Dashboardhome />} />
              <Route path="home" element={<Dashboardhome />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/:id" element={<EditProduct />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<PurchaseHistory />} />
              <Route path='createProduct' element={<CreateProduct />} />
              <Route path='createCategory' element={<CreateCategory />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </Router>
      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  quantity: state.cartTotalQuantity,
  amount: state.cartTotalAmount
});

export default connect(mapStateToProps)(App);


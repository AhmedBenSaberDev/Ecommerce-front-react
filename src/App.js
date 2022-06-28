import { BrowserRouter , Routes , Route } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./app/store";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import UsersList from "./pages/admin/UsersList";
import UpdateUser from "./pages/admin/UpdateUser";
import ProductList from "./pages/admin/ProductList";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AddProduct from "./pages/admin/AddProduct";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import ManageOrder from "./pages/admin/ManageOrder";

import { Container } from "react-bootstrap";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="main-wapper">
        <ToastContainer/>
        <Header></Header>
        <Container>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/orders" element={<OrderList/>}/>
            <Route path="/order/:id" element={<Order/>}/>
            <Route path="/admin/products" element={<ProductList/>}/>
            <Route path="/admin/product/add" element={<AddProduct/>}/>
            <Route path="/admin/product/:id/edit" element={<UpdateProduct/>}/>
            <Route path="/admin/users" element={<UsersList/>}/>
            <Route path="/user/:id/edit" element={<UpdateUser/>}/>
            <Route path="/product/:id" element={<Product/>}/>       
            <Route path="/admin/orders" element={<ManageOrder/>}/> 
          </Routes>
        </Container>
      </div>
        <Footer></Footer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

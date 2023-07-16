import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import CartDetail from './components/CartDetail';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/Register/RequireAuth";
import RedirectIfAuthenticated from "./components/Register/RedirectIfAuthenticated";
import RequireAdmin from "./components/Register/RequireAdmin";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={
              <RedirectIfAuthenticated> 
                <Login /> 
              </RedirectIfAuthenticated>} />
            <Route path="/register" element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>} />
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/create" element={
              <RequireAuth>
                <RequireAdmin>
                  <CreateProduct />
                </RequireAdmin>
              </RequireAuth>} />
            <Route path="/products/edit/:id" element={
              <RequireAuth>
                <RequireAdmin>
                  <EditProduct />
                </RequireAdmin>
              </RequireAuth>} />
            <Route path="/cart-detail" element={<CartDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;


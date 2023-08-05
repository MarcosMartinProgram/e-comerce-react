import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import CreateCategory from './components/Categories/CreateCategory'
import EditCategory from './components/Categories/EditCategory';
import Products from './components/Products/Products';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/Products/CreateProduct';
import EditProduct from './components/Products/EditProduct';
import CartDetail from './components/cart/CartDetail';
import PurchaseSuccess from './components/cart/PurchaseSuccess';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/Register/RequireAuth";
import RedirectIfAuthenticated from "./components/Register/RedirectIfAuthenticated";
import RequireAdmin from "./components/Register/RequireAdmin";
import { CartProvider } from './contexts/CartContext';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
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
              <Route path="/categories/create" element={
                <RequireAuth>
                  <RequireAdmin>
                    <CreateCategory />
                  </RequireAdmin>
                </RequireAuth>} />
              <Route path="/categories/edit/:id" element={
                <RequireAuth>
                  <RequireAdmin>
                    <EditCategory />
                  </RequireAdmin>
                </RequireAuth>} />  
              <Route path="/cart-detail" element={<CartDetail />} />
              <Route path="purchase-success" element={<PurchaseSuccess/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


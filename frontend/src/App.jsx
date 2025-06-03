import { Route, Routes,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import Product from "./pages/Product"
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Collections from "./pages/Collections";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import CustomSlider from "./components/CustomSlider";
function App() {
  const {user ,checkAuth} = useUserStore()
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  
 
// LOADİNG SPİNNER EKLENECEK
  return (
    <div className="min-h-screen relative overflow-hidden"> 
     
      <Navbar/>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/collections" element={<Collections/>} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/secret-dashboard' element={user?.role==="admin" ? <AdminPage /> : <Navigate to='/' />} />
          <Route path='/category/:category' element={<CategoryPage/>} />
          <Route path='/cart' element={user ? <CartPage/> : <Navigate to='/login' /> }/>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/purchase-success" element={user ? <PurchaseSuccessPage/> : <Navigate to='/login' />} />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
          <Route path='/custom-slider' element={<CustomSlider/>} />
      
          
          
      </Routes>
        <Footer/>
      <Toaster/>
    </div>
  );
}

export default App;

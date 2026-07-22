import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";
import AddNewAddress from "./components/AddNewAddress";
import PaymentSuccess from "./components/PaymentSuccess";
import OrderPage from "./components/OrderPage";
import Profile from "./components/Profile";
import CustomerSupport from "./components/CustomerSupport";
import Advertisement from "./components/Advertisement";
import OurStories from "./components/OurStories";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";

import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Notifications from "./components/Notifications";
import FAQ from "./components/FAQ";
import Payment from "./components/Payment";
import Shipping from "./components/Shipping";
import CancellationReturns from "./components/CancellationReturns";
import Privacy from "./components/Privacy";
import Security from "./components/Security";
import TermsOfUse from "./components/TermsOfUse";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />

      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/account-create"
            element={
              <PublicRoute>
                <CreateAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/add_new_address"
            element={
              <ProtectedRoute>
                <AddNewAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Carts"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer_support"
            element={
              <ProtectedRoute>
                <CustomerSupport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advertisement"
            element={
              <ProtectedRoute>
                <Advertisement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact_us"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about_us"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/our_stories"
            element={
              <ProtectedRoute>
                <OurStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cancellation_returns"
            element={
              <ProtectedRoute>
                <CancellationReturns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FAQ's"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/terms_of_use"
            element={
              <ProtectedRoute>
                <TermsOfUse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            }
          />
          <Route
            path="/privacy"
            element={
              <ProtectedRoute>
                <Privacy />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

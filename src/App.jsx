import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Businessregistrationform from "./components/Businessregistrationform";
import Authpage from "./components/Authpage";

import MyBookings from "./components/MyBookings";
import "../src/animation.css";
import Services from "./pages/services/Services";
import Home from "./pages/Home/Home";
import Contact from "./pages/contact/Contact";
import ProtectedRoute from "./components/Protectedroute";
import BusinessProfile from "./components/Profiles/Businessprofile";
import UserProfile from "./components/Profiles/Userprofile";
import BookingForm from "./components/BookingForm";
import AdminDashboard from "./components/dashboard";
import Portfolio from "./pages/Portfolio/Portfolio";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsAndConditionsPage from "./components/TermsAndConditionsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authpage />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage/>} />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-profile" element={<UserProfile/>} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/business-registration" element={<Businessregistrationform />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

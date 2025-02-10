import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Assuming Navbar is in components folder
import HomePage from "./components/Homepage";
import Businessregistrationform from "./components/Businessregistrationform";
import Servicelistingpage from "./components/Servicelistingpage";
// import HomePage from './pages/HomePage';
// import ServiceListingPage from './pages/ServiceListingPage';
// import BusinessDashboard from './pages/BusinessDashboard';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/services/:id" element={<ServiceListingPage />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />*/}
        <Route path="/services" element={<Servicelistingpage />} />
        <Route
          path="/business-registration"
          element={<Businessregistrationform />}
        />
      </Routes>
    </Router>
  );
}

export default App;

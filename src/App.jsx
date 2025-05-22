// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";


import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      {/* HMR Test Heading */}
      <div style={{ textAlign: "center", margin: "1rem 0", color: "#646cff" }}>
      
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import Home from "./pages/Home";  // ✅ Import Home Page
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Home Page */}
        <Route path="/viewexpenses" element={<ViewExpenses />} />
        <Route path="/addexpense" element={<AddExpense />} />
      </Routes>
    </Router>
  );
}

export default App;

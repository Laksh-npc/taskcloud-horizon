import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
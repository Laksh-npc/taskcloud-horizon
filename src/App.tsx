import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
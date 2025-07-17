import { Routes, Route } from 'react-router'
import './App.css'
import AppNavbar from "./components/navbar.jsx";
import HomePage from "./pages/home.jsx";
import Footer from "./components/footer.jsx";
import About from "./pages/about.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {

  return (
    <>
      <AppNavbar></AppNavbar>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<About />} />
        <Route path="dash" element={<Dashboard />} />
      </Routes>
        <Footer/>
    </>
  )
}

export default App

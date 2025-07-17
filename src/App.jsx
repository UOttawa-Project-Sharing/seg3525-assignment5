import { Routes, Route } from 'react-router'
import './App.css'
import AppNavbar from "./components/navbar.jsx";
import HomePage from "./pages/home.jsx";
import Footer from "./components/footer.jsx";

function About() {
  return <><div>This is the About page.</div></>
}

function App() {

  return (
    <>
      <AppNavbar></AppNavbar>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<About />} />
      </Routes>
        <Footer/>
    </>
  )
}

export default App

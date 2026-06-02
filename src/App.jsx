import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./index.css";
import { Plus, Trash2 } from "lucide-react";
import Navbar  from './navbar/Navbar';
import Footer from './component/footer'; 
import HomePage from './component/HomePage';

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  )
   
}

export default App;
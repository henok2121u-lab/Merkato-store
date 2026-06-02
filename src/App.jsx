import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./index.css";
import { Plus, Trash2 } from "lucide-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-4xl font-bold text-blue-500">gari</h1>
       <Plus className="w-6 h-6 text-green-500" />
      <Trash2 className="w-6 h-6 text-red-500" />
    </>
  )
}

export default App

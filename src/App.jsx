import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListExample from './Example'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ListExample/>
    </>
  )
}

export default App

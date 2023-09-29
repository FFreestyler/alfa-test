import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import StartPage from './pages/StartPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />}>
          <Route path=":page" element={<StartPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

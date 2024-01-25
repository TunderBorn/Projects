import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Main from './components/CustMain'
import Results from './components/Results'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Favourites from './components/Favourites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:companyName" element={<Results />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

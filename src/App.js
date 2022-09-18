import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import mainTheme from './theme/MainTheme.js'
import './App.css'
import AboutClub from './components/AboutClub/AboutClub'

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
          <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/about' element={<AboutClub />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

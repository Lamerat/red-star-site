import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import mainTheme from './theme/MainTheme.js'
import './App.css'
import AboutClub from './components/AboutClub/AboutClub'
import NewsPage from './components/NewsPage/NewsPage'
import SingleNewsPage from './components/SingleNewsPage/SingleNewsPage'
import PlayersPage from './components/PlayersPage/PlayersPage'
import CalendarBig from './components/CalendarBig/CalendarBig'
import MediaPage from './components/MediaPage/MediaPage'

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
          <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/about' element={<AboutClub />} />
          <Route exact path='/news' element={<NewsPage />} />
          <Route exact path='/news/:id' element={<SingleNewsPage />} />
          <Route exact path='/players/:filter' element={<PlayersPage />} />
          <Route exact path='/calendar' element={<CalendarBig />} />
          <Route exact path='/media' element={<MediaPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

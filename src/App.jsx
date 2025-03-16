import { Provider } from 'react-redux'
import './App.css'
import store from './core/redux/store/store'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import ListadoPage from './pages/ListadoPage/ListadoPage'
import PerfilPage from './pages/PerfilPage/PerfilPage'

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        {/*Cambiar todas las rutas por las nuevas una vez que las tengamos para poder hacer el menu */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/listado" element={<ListadoPage/>}/>
        <Route path="/miprofile" element={<PerfilPage/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

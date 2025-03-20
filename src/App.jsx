import { Provider } from 'react-redux'
import './App.css'
import store from './core/redux/store/store'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import ListadoPage from './pages/ListadoPage/ListadoPage'
import PerfilPage from './pages/PerfilPage/PerfilPage'
import ContactoPage from './pages/ContactoPage/ContactoPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Route path="/contacto" element={<ContactoPage/>}/>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  )
}

export default App

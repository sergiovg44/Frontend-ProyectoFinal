import { Provider } from 'react-redux'
import './App.css'
import store from './core/redux/store/store'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        {/*Cambiar todas las rutas por las nuevas una vez que las tengamos para poder hacer el menu */}
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

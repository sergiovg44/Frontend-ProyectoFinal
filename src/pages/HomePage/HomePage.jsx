import React, { useEffect } from 'react'
import MenuOptionComponent from '../../components/MenuOptionComponent'
import { getUserId } from '../../core/services/ProductFetch';
import { setUser } from '../ListadoPage/ListadoAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loadUser, verificarTokenPeriodicamente } from '../../utils/utils';

const HomePage = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  

  useEffect(() => {
    const intervalId = verificarTokenPeriodicamente(dispatch, navigate);
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

      useEffect(() => {

        loadUser(dispatch, navigate, setUser)
      }, []);
  return (
    <div>
        <div>
        <MenuOptionComponent/>
        </div>
        <div className='contenedor-pages'>
            Home
        </div>
        </div>
  )
}

export default HomePage
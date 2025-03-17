import React, { useEffect } from 'react'
import MenuOptionComponent from '../../components/MenuOptionComponent'
import { getUserId } from '../../core/services/ProductFetch';
import { setUser } from '../ListadoPage/ListadoAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate();

    const loadUser = async () => {
      const response = await getUserId(dispatch, navigate);
      if (response.success) {
        dispatch(setUser(response.data)); 
      }
    };


      useEffect(() => {
        loadUser()
    
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
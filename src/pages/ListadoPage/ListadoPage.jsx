import React, { useEffect } from 'react'
import MenuOptionComponent from '../../components/MenuOptionComponent'
import { getSongs } from '../../core/services/ProductFetch'

const ListadoPage = () => {

  const loadSongs = async () => {
 const listSong = await getSongs()
//  console.log(listSong)
  }


  useEffect(() => {
    
    loadSongs()
  
  }, [])

  return (
    <div>
        <div>
        <MenuOptionComponent/>
        </div>
        <div className='contenedor-pages'>
            Listado
        </div>
    </div>
  )
}

export default ListadoPage
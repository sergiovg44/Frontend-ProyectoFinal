import React, { useEffect } from 'react'
import MenuOptionComponent from '../../components/MenuOptionComponent'
import { getSongs } from '../../core/services/ProductFetch'
import { useDispatch, useSelector } from 'react-redux'
import { setSongs } from './ListadoAction'
import ListaCancionesComponent from '../../components/ListaCancionesComponent'
import DetalleSongComponent from '../../components/DetalleSongComponent'

const ListadoPage = () => {
  const dispatch = useDispatch()
  const {songs, selectedSong} = useSelector((state) => state.songsReducer)

  const loadSongs = async () => {
 const songs = await getSongs()
//  console.log(songs)
    dispatch(setSongs(songs))
  }
  useEffect (() =>{

    console.log(selectedSong)
  },[selectedSong])

  useEffect(() => {
    
    loadSongs()
  
  }, [])

  return (
    <div>
        <div>
        <MenuOptionComponent/>
        </div>
        <div className='contenedor-pages'>
        {!selectedSong ?(

          <ListaCancionesComponent/>
        ):(
          <DetalleSongComponent/>
        )

        }    
            
        </div>
    </div>
  )
}

export default ListadoPage
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { transformTime } from '../utils/utils';

const DetalleSongComponent = () => {

    const { songs, selectedSong  } = useSelector((state) => state.songsReducer);
    const dispatch = useDispatch();


  return (
    <div className='card-detail'>
        <div className='box-img'>
            <img 
            src={selectedSong.images_mediana}
            alt="imagen del albun"
            className='img-detail'
            />
        </div>
        <div className='song-info'>
            <h2 className='title-detail'>Detalle de la cancion</h2>
            <div>
                <div>
                <span>{selectedSong.song_name} </span>
                </div>
                <span>{transformTime(selectedSong.duration_ms)}</span>
                <div className="">
                    {selectedSong.artist_name.map((e, idx) => (
                      <span key={idx} className="">
                        {e}{" "}
                      </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetalleSongComponent
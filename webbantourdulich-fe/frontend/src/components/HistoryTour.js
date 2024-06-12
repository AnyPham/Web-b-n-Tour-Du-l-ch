import React, { useState } from 'react'
import '../styles/historyTour.scss'
import ListCardHistory from './ListCardHistory'
import { getToursFromLocal } from '../utils/localStorageUtils';
import Service from './Service';

function HistoryTour(props) {
    const [tourHistory, setTourHistory] = useState(getToursFromLocal())
  return (
    <div className='histoury-tour'>
        <div className='container' >
            <div className="row">
                <Service />    
            </div>
            <div className='row'>
                <h2 className='title-tours'>Tours du lịch bạn đã xem gần đây</h2>
            </div>
            <div className='row'>
                <ListCardHistory data={tourHistory}/>
            </div>
                
        </div>
    </div>

  )
}

export default HistoryTour
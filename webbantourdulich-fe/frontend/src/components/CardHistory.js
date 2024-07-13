import React from 'react'
import '../styles/cardHistory.scss'
import {Link} from "react-router-dom";
import { formatPrice } from '../utils/utill';

export default function CardHistory(props) {
  const handleRemoveTour = () => {
    const { id } = props.tour;
    props.onRemoveTour(id); // Gọi phương thức callback từ thằng cha
  };
  return (
    <div className='col-4'>
        <div className="card mb-3 card-history" style={{maxWidth: '540px'}}>
        <Link to={`/tourList/${props.tour.id}`}>
            
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img style={{width: '120px', height: '120px'}} src={props.tour.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <div className="title">{props.tour.name}</div>
                        <div className="card-text d-flex">
                            <div className='score text-score'>8.5</div>
                            <div className='text-score'>Rất tốt</div>
                        </div>
                        <div className="card-text wrap-price">
                            <div className='text-price price-history'>{formatPrice(props.tour.price)}</div>
                            <div className='text-price'>VND</div>
                        </div>
                    </div>
                    </div>
                </div>
            
            </Link>
            <div className='close' onClick={handleRemoveTour}>&#215;</div>
        </div>
    </div>
  )
}

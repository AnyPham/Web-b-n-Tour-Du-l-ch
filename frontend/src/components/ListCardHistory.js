import React, { useState } from 'react'
import CardHistory from './CardHistory'
import { removeTourFromLocal } from '../utils/localStorageUtils';

export default function ListCardHistory(props) {
  const [tours, setTours] = useState(props.data);

  const handleTourRemoval = (tourId) => {
    removeTourFromLocal(tourId); // Xóa tour khỏi localStorage

    // Cập nhật giao diện bằng cách lọc ra danh sách tours mới
    const updatedTours = tours.filter((tour) => tour.id !== tourId);
    setTours(updatedTours);
  };
  return (
    <>
      {
        tours && tours.map((tour) => (
          <CardHistory key={tour.id} tour={tour} onRemoveTour={handleTourRemoval}/>
        ))
      }
        
    </>
  )
}

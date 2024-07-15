import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TourLeft from '../components/tours/TourLeft'
import TourRight from '../components/tours/TourRight'
import '../styles/tour.scss'
import { useParams } from 'react-router-dom'
import { addTourToLocal } from '../utils/localStorageUtils'

export default function Tour() {
    const { tourId } = useParams();
    const [tour, setTour] = useState([])
    useEffect(() => {
    // Hàm được gọi khi component được render hoặc state thay đổi
    fetchDataTour();
  }, []); // Tham số thứ hai là một mảng rỗng, chỉ gọi useEffect một lần sau khi component được mount

  async function fetchDataTour() {
    try {
      const response = await fetch('http://localhost:5000/api/tours?id='+tourId); // Gọi API để lấy dữ liệu
      const jsonData = await response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
      setTour(jsonData[0]);
      addTourToLocal(jsonData[0])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
        <Navbar />
        <div style={{backgroundColor: '#eeeeee'}}>
          <div className='container tour'>
              <div className='title'>{tour.name}</div>
              <div className='container-rank'>
                  <div className='point'>8.0</div>
                  <div className='rank'>Rất tốt</div>
              </div>
              <div className='row'>
                  <div className='col-8'>
                      {
                          tour && <TourLeft data={tour} />
                      }
                      
                  </div>
                  <div className='col-4'>
                      <TourRight data={tour} />
                  </div>
              </div>
          </div>
        </div>
        <Footer />
    </>
  )
}

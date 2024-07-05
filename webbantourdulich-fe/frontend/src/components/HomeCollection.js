import React, { useEffect, useState } from 'react'
import HomeCollectionTitle from './HomeCollectionTitle'
import '../styles/homeCollection.scss'
import ListCard from './ListCard'

export default function HomeCollection() {
    const [dataTourTrongNuoc, setDataTourTrongNuoc] = useState([])
    const [dataTourNuocNgoai, setDataTourNuocNgoai] = useState([])

    useEffect(() => {
    // Hàm được gọi khi component được render hoặc state thay đổi
    fetchDataTourTrongNuoc();
    fetchDataTourNuocNgoai();
  }, []); // Tham số thứ hai là một mảng rỗng, chỉ gọi useEffect một lần sau khi component được mount

  async function fetchDataTourTrongNuoc() {
    try {
      const response = await fetch('http://localhost:5000/api/tours?catagoryId=1&_limit=6'); // Gọi API để lấy dữ liệu
      const jsonData = await response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
      setDataTourTrongNuoc(jsonData); // Cập nhật state với dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function fetchDataTourNuocNgoai() {
    try {
      const response = await fetch('http://localhost:5000/api/tours?catagoryId=2&_limit=6'); // Gọi API để lấy dữ liệu
      const jsonData = await response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
      setDataTourNuocNgoai(jsonData); // Cập nhật state với dữ liệu từ API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (
    <div className='container home-collection'>
        <div className='row'>
            <div className='col-12'>
                <HomeCollectionTitle 
                    title={"Điểm đến yêu thích trong nước"}
                    des={"Lên rừng xuống biển. Trọn vẹn Việt Nam"}
                />
            </div>
            <div className='col-12'>
                <ListCard data={dataTourTrongNuoc} priceRow={true}/>
            </div>
        </div>

        <div className='row'>
            <div className='col-12'>
                <HomeCollectionTitle 
                    title={"Điểm đến yêu thích nước ngoài"}
                    des={"Bao la thế giới. Bốn bể là nhà"}
                />
            </div>
            <div className='col-12'>
                <ListCard
                    data={dataTourNuocNgoai} priceRow={true}
                />
            </div>
        </div>
    </div>
  )
}

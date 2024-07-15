import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';

export default function ListCard(props) {
  const { data } = props;
  const [visibleCards, setVisibleCards] = useState(6);

  // xử lí load thêm dữ liệu khi kéo trang xuống
  const handleScroll = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const scrollHeight = window.pageYOffset + windowHeight;

    if (scrollHeight >= documentHeight) {
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3">
      {data.slice(0, visibleCards).map((tour) => (
        <CardItem
          key={tour.id}
          idCard={tour.id}
          title={tour.name}
          image={tour.image}
          time={tour.quantity_date}
          date={tour.start_date}
          plane={tour.vehicle[0].nameVehicle}
          start={tour.star}
          priceAdult={tour.price_adult}
          priceChild={tour.price_child}
          quantity = {tour.quantity}
          catagoryId={tour.catagoryId}
          priceRow={props.priceRow}
        />
      ))}
    </div>
  );
}

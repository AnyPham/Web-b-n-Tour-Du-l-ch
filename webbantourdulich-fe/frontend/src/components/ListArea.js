import React, { useEffect, useState } from 'react';
import "../styles/list-area.scss";
import { useDispatch } from 'react-redux';
import { areaHot } from '../redux/slices/FiltersSlice';

export default function ListArea(prop) {
  const [areas, setAreas] = useState([])
  const [area, setArea] = useState("")
  const dispatch = useDispatch()
  const handleAreaClick = (area) => {
    setArea(area)
  };

    useEffect(() => {
        dispatch(areaHot(area));
    }, [dispatch, area]);

    useEffect(() => {
        setAreas(prop.data)
    }, [prop, prop.data]);
  return (
    <div className='list-area'>
      <div className='title'>{prop.title}</div>
      <ul className='container-list'>
        {areas && areas.map((area, index) => (
          <li key={index} onClick={() => handleAreaClick(area)}>
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}

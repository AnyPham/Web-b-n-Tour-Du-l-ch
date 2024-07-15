import React, { useEffect, useState } from 'react';
import '../styles/search.scss';
import { LocationOn, Search, EventNote, FlightTakeoff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { endLocationsSelector, startDatesSelector, startlocationsSelector } from '../redux/selectors';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from './CustomDatePicker';
import { searchChange } from '../redux/slices/FiltersSlice';
import { useNavigate } from 'react-router-dom';
import withWidth from "@mui/material/Hidden/withWidth";

export default function SearchHome(prop) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startlocations = useSelector(startlocationsSelector);
  const endLocations = useSelector(endLocationsSelector);
  const startDates = useSelector(startDatesSelector);
  const [starting, setStarting] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const handleOnChaneStart = (e) => {
    setStarting(e.target.value);
  };

  const handleOnchaneDes = (e) => {
    setDestination(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSearch = () => {
    dispatch(searchChange({ starting, destination, date }));
    navigate('/category'); // Chuyển hướng đến trang /category
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSearchVisible(window.innerWidth >= 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const image = prop.image || false;

  return (
    <div className="search-home container-fluid p-0 position-relative" >

      <img style={{width:1308, height:370}}
        className={`w-100 ${image ? 'd-none' : ''}`}
        src={'https://file1.dangcongsan.vn/DATA/0/2018/01/149_1024x548-10_00_36_430.jpg'}
        alt="..."
      />
      <div
        className={`container container-search ${
          isSearchVisible ? '' : 'd-none'
        } ${image ? 'shadow-none' : 'position-absolute translate-middle'}`}
      >
        <div className="row container-wrap">

          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
            <div className="d-flex flex-row group-input">
              <span className="input-group-text bg-icon">
                <FlightTakeoff className="icon" />
              </span>
              <div className="d-flex flex-column flex-group">
                <label className="title">Điểm khởi hành</label>
                <select
                  onChange={(e) => handleOnChaneStart(e)}
                  className="input"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Chọn điểm khởi hành
                  </option>
                  {startlocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
            <div className="d-flex flex-row group-input">
              <span className="input-group-text bg-icon">
                <LocationOn className="icon" />
              </span>
              <div className="d-flex flex-column flex-group">
                <label className="title">Điểm đến</label>
                <select
                  onChange={(e) => handleOnchaneDes(e)}
                  className="input"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Chọn điểm đến
                  </option>
                  {endLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/*<div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">*/}
          {/*  <div className="d-flex flex-row group-input">*/}
          {/*    <span className="input-group-text bg-icon">*/}
          {/*      <EventNote className="icon" />*/}
          {/*    </span>*/}
          {/*    <div className="d-flex flex-column flex-group">*/}
          {/*      <label className="title">Ngày đi</label>*/}
          {/*      <CustomDatePicker*/}
          {/*        date={startDates}*/}
          {/*        onDateChange={handleDateChange}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
            <div
              className="wrap-icon_search"
              onClick={() => handleSearch()}
            >
              <Search className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

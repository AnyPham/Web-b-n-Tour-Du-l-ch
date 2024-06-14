import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeCollection from "../components/HomeCollection";
import SearchHome from "../components/SearchHome";
import { Search } from "@mui/icons-material";
import "../styles/buttonSearch.scss"
import HistoryTour from "../components/HistoryTour";

const Home = () => {

  return (
    <div className="bg-white position-relative">
      <Navbar />
      <SearchHome />
      <HistoryTour />
      <HomeCollection />
      <Footer />
      <div className="container_search">
        <Search className='icon' />
      </div>
    </div>
  );
};

export default Home;

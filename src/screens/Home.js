import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search,setSearch]=useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fooddata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel" style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption " style={{zIndex:"10"}}>
            <div class="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/100×100?burger"
              className="d-block w-100" style={{filter:"brightness(30%)"}}
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/100×100?noodles"
              className="d-block w-100" style={{filter:"brightness(30%)"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/100×100?pizza"
              className="d-block w-100" style={{filter:"brightness(30%)"}}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCat.length > 0 && foodCat.map((data) => (
          <div className="row mb-3">
          <div key={data._id}>
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr/>
            </div>
            {foodItem.length > 0 && foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filterItems) => {
              return (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3"><Card foodItem={filterItems} 
                options={filterItems.options[0]}
                ></Card></div>
                // <div key={filterItems._id} className="col-12 col-md-6 col-lg-3"><Card foodName={filterItems.name} 
                // options={filterItems.options[0]}
                // imgSrc={filterItems.img}
                // ></Card></div>
              );
            })}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

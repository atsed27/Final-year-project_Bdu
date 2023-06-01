import React, { useEffect, useState } from "react";
import "./Advert.css";
import menuIcon from "../../img/menu.png";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import AdvertCategory from "../../components/AdvertCategory/AdvertCategory";
import SchoolAdvertSide from "../../components/SchoolAdvertSide/SchoolAdvertSide";
import LostAndFoundSide from "../../components/LostAndFoundSide/LostAndFoundSide";

const Advert = () => {
  const AdvertCategories = [
    { id: 1, name: "School Advert" },
    { id: 2, name: "Lost Things" },
    { id: 3, name: "Found Things" },
  ];

  const [currentCategory, setCurrentCategory] = useState(null);
  const [minimize, setMinimize] = useState(false);
  return (
    <>
      <NavBar />
      <div
        style={{ gridTemplateColumns: minimize ? "6rem auto" : "22% auto" }}
        className="Advert"
      >
        {/* Left side */}
        <div className="Left-side-advert">
          <div className="Advert-container">
            <div className="categoryHeader">
              <div className="categoryText">
                {minimize ? "" : <h3>Advert Categories</h3>}
              </div>
              <div className="menuIcon">
                <img
                  src={menuIcon}
                  alt=""
                  title="mimimize/maximize"
                  style={{ cursor: "pointer", height: "2rem", width: "2rem" }}
                  onClick={() => setMinimize((minimize) => !minimize)}
                />
              </div>
            </div>

            <hr style={{ width: "100%", border: "0.1px solid gray" }} />

            <div className="Advert-list">
              {AdvertCategories.map((category, id) => (
                <div onClick={() => setCurrentCategory(category)}>
                  <AdvertCategory
                    key={id}
                    data={category}
                    minimize={minimize}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right side advert*/}
        <div className="Right-side-advert">
          {currentCategory?.name === "School Advert" ? (
            <SchoolAdvertSide />
          ) : currentCategory?.name === "Lost Things" ? (
            <LostAndFoundSide location="Lost Page" />
          ) : currentCategory?.name === "Found Things" ? (
            <LostAndFoundSide location="Found Page" />
          ) : (
            <p>"Choose Advert Categories from the left side bar..."</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Advert;

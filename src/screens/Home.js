import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Crousel from "../components/Crousel";

export default function Home({ search, onSetSearch }) {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      if (Array.isArray(data) && data.length >= 2) {
        setFoodItems(data[0]);
        setFoodCategory(data[1]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <Crousel search={search} onSetSearch={onSetSearch} />
      </div>
      <div className="container">
        {foodCategory !== []
          ? foodCategory.map((category) => {
              return (
                <div key={category._id} className="row mb-3">
                  <div key={category._id} className="fs-3 m-3">
                    {category.CategoryName}
                  </div>
                  <hr />
                  {foodItems !== []
                    ? foodItems
                        .filter(
                          (items) =>
                            items.CategoryName === category.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((items) => {
                          return (
                            <div
                              key={items._id}
                              className="col-12 col-sm-6 col-lg-3"
                            >
                              <Card
                                foodItems={items}
                                // foodName={items.name}
                                foodOptions={items.options[0]}
                                // foodImg={items.img}
                              />
                            </div>
                          );
                        })
                    : "Data not found!"}
                </div>
              );
            })
          : "Category not found"}
      </div>
      <Footer />
    </div>
  );
}

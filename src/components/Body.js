import { restrauntList } from "../constant";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";


function filterData(searchText,restraurants){
  const filterData=restraurants.filter((restaurant)=>
  restaurant.data.name.includes(searchText));
  return filterData;
}

const Body = () => {
  const  [restaurants,setRestaurants]=useState(restrauntList);
  const [searchText,setSearchText]=useState("");
    return (
      <>
      <div className="search-container">
        <input
        type="text" className="seacrh-input" 
        placeholder="Search"
        value={searchText}
        onChange={(e)=>{
        setSearchText(e.target.value)}}
        />
        <button className="search-btn"
        onClick={()=>{
          const data=filterData(searchText,restrauntList);
          setRestaurants(data);
        }}>Search
        </button>
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
        })}
      </div>
      </>
    );
  };

  export default Body;
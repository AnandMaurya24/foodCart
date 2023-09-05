import { restrauntList } from "../constant";
import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";


function filterData(searchText,restraurants){
  const filterData=restraurants.filter((restaurant)=>
  restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
  return filterData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");


    
      useEffect(()=>{
        getRestaurants();
      },[]);
      async function getRestaurants(){
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json =await data.json();
        console.log(json);
        setAllRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      }

      if(!allRestaurants) return null;

      if(filteredRestaurants?.length===0)
        return <h1>No Restaurant match your filter</h1>;

      return allRestaurants?.length===0?(<Shimmer/>):
      (
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
          const data=filterData(searchText,allRestaurants);
          setFilteredRestaurants(data);
        }}>Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => {
          return <RestaurantCard {...restaurant.info} key={restaurant.info.id} />;
        })}
      </div>
      </>
    );
  };

  export default Body;
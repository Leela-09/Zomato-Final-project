import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import FilterOption from "./FilterOption";
import Header from "../common/Header";
import RestaurantList from "./RestaurantList";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";



function QuickSearch() {
  let navigate = useNavigate()
  let {meal_id} = useParams();
  let [locationList, setLocationList] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]); // Fixed variable casing
  let [filterData,setFilterData] = useState({
    mealtype: meal_id,
    sort:1,
  });

  let getLocationList = async () => {
    let url = 'http://localhost:5003/api/get-location-list';
    let { data } = await axios.get(url);
    // console.log(data);
    setLocationList(data.location); // Ensure the API response contains 'locations'
  };

  let filter = async () => {
    let url = 'http://localhost:5003/api/filter';
  
    let { data } = await axios.post(url, filterData);
    if(data.status === true) {
      setRestaurantList(data.restaurants);
    }else{
      // alert(data.message);
      setRestaurantList([]);
    }
    // Make sure 'data.restaurant' is an array
  };
  
  let getFilterResult = (event,type) =>{
    let value = event.target.value;
   let _filterData = { ...filterData};
  //  value = value.split("-");
  //  console.log(value);

switch (type){
  case 'sort':
    // sort code
    _filterData["sort"] = parseInt(value);
  break;
  case "costForTwo":
    
  value = value.split("-");
 _filterData["l_cost"] = Number(value[0]);
 _filterData["h_cost"] = Number(value[1]);

   break;
  default:
    break;

}
setFilterData(_filterData );
  };
  useEffect(() => {
    getLocationList();// mounting ==> only once
  },[]);

    useEffect(()=>{
     filter();
    
  }, [filterData]); // Dependency array ensures these functions run only once on component load

  return (
    <>
      <Header bg="bg-danger" />
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3 fw-bold ">Breakfast Places In Mumbai</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
         
          <FilterOption locationList = {locationList}
          getFilterResult={getFilterResult}
          />
          <RestaurantList restaurantList = {restaurantList}/>
         

        </div>
      </div>
    </>
  );
}

export default QuickSearch;



// /*
// * we click radio/check, select inputs
// * getFilterResult(event,type) get triggred
// * value of input is access
// * we create a local filter data variable , to avoid the issue if refrance;
// * as per the switch operation filterData is update
// * useFilterData() is triggered to update the filterData state
// * as soon as filterData updates a useEffect() having filterData dependance get 
// * and the filter API is trigger
// * and on response restaurant list is update
// */

import { useEffect, useState } from "react";
import Header from "../common/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {jwtDecode} from "jwt-decode";

function Restaurant() {
  let getUserLoginData = () => {
    // Read data from local storage
    let token = localStorage.getItem("Zomato Final project");
    if (token == null) {
      return false;
    } else {
      // Decode a JWT token
      try {
        let result = jwtDecode(token);
        return result;
      } catch (error) {
        // Remove token from localStorage on error
        localStorage.removeItem("Zomato Final project");
        return false;
      }
    }
  };

  let [user, setUser] = useState(getUserLoginData());
  let { id } = useParams();

  let initRestaurant = {
    aggregate_rating: "",
    city: "",
    city_id: 0,
    contact_number: "",
    cuisine: [],
    cuisine_id: [],
    image: "breakfast.jpg",
    locality: " ",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: " ",
    rating_text: "",
    thumb: [],
    _id: "",
  };

  let [restDetailsToggle, setRestDetailsToggle] = useState(true);
  let [menuList, setMenuList] = useState([]);
  let [rDetails, setRDetails] = useState({ ...initRestaurant });
  let [totalPrice, setTotalPrice] = useState(0);

  let getRestaurantDetails = async () => {
    let url = `http://localhost:5003/api/get-restaurant-details-by-id/${id}`;
    let { data } = await axios.get(url);
    if (data.status === true) {
      setRDetails({ ...data.restaurants });
    } else {
      setRDetails({ ...initRestaurant });
    }
  };

  let getMenuItems = async () => {
    let url = `http://localhost:5003/api/get-menu-items/${id}`;
    let { data } = await axios.get(url);
    if (data.status === true) {
      setMenuList([...data.menu_items]);
    } else {
      setMenuList([]);
    }
  };

  let addItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty += 1;
    setMenuList(_menuList);

    let newTotal = totalPrice + _menuList[index].price;
    setTotalPrice(newTotal);
  };

  let removeItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty -= 1;
    setMenuList(_menuList);

    let newTotal = totalPrice - _menuList[index].price;
    setTotalPrice(newTotal);
  };

  let makePayment = async () => {
    let url = "http://localhost:5003/api/gen-orders-id";

    let { data } = await axios.post(url, { amount: totalPrice });

    if (data.status === false) {
      alert("Unable to generate order ID");
      return false;
    }

    let { order } = data;

    var options = {
      key: "rzp_test_RB0WElnRLezVJ5",
      amount: order.amount,
      currency: order.currency,
      name: "Zomato Order",
      description: "Make payment for your orders",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      order_id: order.id,
      handler: function (response) {
             
        var verifyData = {
          // payment_id:response.razorpay_payment_id,
          // order_id:response.razorpay_order_id,
          // signature:response.razorpay_signature,
          name: user.name,
          mobile:2929292929,
          email:user.email,
          // order_list: userOrder,
          totalAmount: totalPrice,

  };
  // let {data} = await axios.post(
  //         'http://localhost:3000/api/verify-payment',
  //         verifyData
  // );
  // if(data.status === true) {
  //   alert("payment completed successfully");
  //   window.location.assign("/");
  // } else {
  //   alert("payment fails");
  // }


        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "2929292929",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  return (
    <>
         <div
        className="modal fade"
        id="modalUserDetails"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="model-header">  
              <h5 className="modal-title" id="exampleModelToggleLabel2">
                name
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            < div className="modal-body">
            <div className="mb-3">
              <label
              htmlFor="exampleFormControlInput1"
              className="form-label">
                Full Name
              </label>
              <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter full Name"
              value={user.name}
              onChange={() => {}}
              disabled
              />
              </div>
              <div className="mb-3">
                <label
                htmlFor="exampleFormControlInput2"
                className="form-label">
                  Email
                </label>
                <input 
                type="email"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={user.email}
                onChange={() => {}}
                />
                </div>
                <div className="mb-3">
                  <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label">
                    Address
                  </label>
                  <textarea 
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value="Kavi"
                    onChange={() => {}}
                    >
             
              </textarea>
            </div>
            </div>
            <div className="modal-footer">
              <button
              className="btn-sm btn-danger"
              data-bs-target="#modalMenuList"
              data-bs-toggle="modal">
                Back
              </button>
              <button className="btn-sm btn-success" onClick={makePayment}>Pay now</button>
              </div>
              </div>
              </div>
              </div>
      <div
        className="modal fade"
        id="modalMenuList"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModelToggleLabel">
                {rDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            {
            menuList.map((menu,index) => {
              return (
      <div className="row p-2" key={menu._id}>
        <div className="col-8">
          <p className="mb-1 h6">{menu.name}</p>
          <p className="mb-1">{menu.price}</p>
          <p className="small text-muted">
        {menu.description}
          </p>
        </div>
        <div className="col-4 d-flex mb-3 justify-content-end">
          <div className="menu-food-item align-items-center">
            <img src={process.env.PUBLIC_URL + "/Image/"+ menu.image} alt="" />

            {
              (menu.qty === 0) ? (
                <button className="btn-sm btn-primary btn-sm add" onClick={()=>
                  addItem(index)}>
                   Add</button>
                   ):(
                    <div className="order-item-count section">
                    <span className="hand" onClick={()=>
                  removeItem(index)}>-</span>
                    <span>{menu.qty}</span>
                    <span className="hand"
                    onClick={()=>
                      addItem(index)}>+</span>
                    </div>
                   )
            }
          
          </div>
        </div>
        <hr className="p-0 my-2" />
      </div>
    )
  })
}

                {/* </div>
                      <div className="p-0 my-2" />
                    
                    <div className="row p-2">
                <div className="col-8">
                  <p className="mb-1 h6">Gobi Manchurian</p>
                  <p className="mb-1">89</p>
                  <p className="small text-muted">
                    Deep-fried cauliflower tossed in
                    pungent spice to form a flavorSome dry Curry
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <div className="menu-food-item">
                    <img src="/Image/" alt="" />

                  

                    <div className="order-item-count section">
                      <span className="hand">-</span>
                      <span>0</span>
                      <span className="hand">+</span>
                      </div>
                  </div>
                </div> */}


                   
                    <div className="d-flex justify-content-between">
                      <h3>Total {totalPrice}</h3>
                    
                      <button
                        className="btn-sm btn-danger m-2"
                        data-bs-target="#modalUserDetails"
                        data-bs-toggle="modal"
                      >
                     Process
                      </button>
                    
                      </div> 
              </div>
            </div>
          </div>
        </div>
      {/* </div>
      </div> */}
      <div
        className="modal fade"
        id="modalGallery"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ height: "75vh" }}>
          <div className="modal-content">
            <div className="model-body h-75">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {rDetails.thumb.map((value, index) => {
                  return (
                    <div key={index} className="w-100">
                      <img src={process.env.PUBLIC_URL + "/Image/" + value} alt="" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <Header bg="bg-danger"/>
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="col-12 mt-2">
              <div className="restaurant-main-image position-relative">
                <img src={process.env.PUBLIC_URL + "/Image/" + rDetails.image} alt="" className="" />
                <button
                  className="btn btn-outline-light position-absolute btn-gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#modalGallery"
                >
                  Click To Get Image Gallery
                </button>
              </div>
            </div>
            <div className="col-12">
              <h3 className="mt-4 fw-bold">{rDetails.name}</h3>
              <div className="d-flex justify-content-between">
                <ul className="list-unstyled d-flex gap-3">
                  <li
                    onClick={() => setRestDetailsToggle(true)}
                    className="fw-bold"
                  >
                    Overview
                  </li>
                  <li
                    onClick={() => setRestDetailsToggle(false)}
                    className="fw-bold"
                  >
                    Contact
                  </li>
                </ul>
                { user === false ? (
                  <button disabled 
                    className="btn-sm btn-danger mb-1"
                     > Login to place  order
                      </button>
                ) : (
                <div
                className="btn-sm btn-danger mb-1"
                data-bs-target="#modalMenuList"
                data-bs-toggle="modal"
                onClick={getMenuItems}>
                Show Menu List
                  </div>
                )}
              </div>
              <hr className="mt-0" />

              {restDetailsToggle === true ? (
                <div className="over-view">
                  <p className="h5 mb-4">About this place</p>
                  <p className="mb-0 fw-bold">Cuisine</p>
                  <p>
                    {rDetails.cuisine.reduce((pValue, cValue) => {
                      let value;
                      if (pValue === "") {
                        value = cValue.name;
                      } else {
                        value = `${pValue},${cValue.name}`;
                      }
                      return value;
                    }, "")}
                  </p>

                  <p className="mb-0 fw-bold">Average Cost</p>
                  <p>₹{rDetails.min_price} for two people (approx.)</p>
                </div>
              ) : (
                <div className="over-view">
                  <p className="mb-0 fw-bold">Phone Number</p>
                  <p>+{rDetails.contact_number}</p>
                  <p className="mb-0 fw-bold">Address</p>
                  <p>
                    {rDetails.locality} , {rDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      
    </>
 
)
}

export default Restaurant;
import { useEffect, useState } from "react"; 
import { useNavigate } from 'react-router-dom'; 
import axios from "axios"; 

function QuickSearch() {
    const [mealList, setMealList] = useState([]); // Initialize state for mealList
    const navigate = useNavigate(); // Initialize navigate
    
    let getMenuListFromServer = async () => {
        let url = 'http://localhost:5003/api/get-meal-types-list';
        try {
            let { data } = await axios.get(url); 
            setMealList([...data.meal_types]); // Update state with meal types
        } catch (error) {
            console.error("Error fetching meal types:", error); // Handle errors gracefully
        }
    };

    useEffect(() => {
        getMenuListFromServer(); // Fetch meal types on component load
    }, []); // Empty dependency array ensures this runs only once

    return (
        <>
            <section className="quick-search">
                <h1 className="quick-search-title">Quick Searches</h1>
                <p className="quick-search-desc">Discover restaurants by type of meal</p>

                <section className="quick-search-items">
                    {mealList.map((meal, index) => (
                        <section key={index} className="quick-search-item">
                            <section 
                                className="quick-search-item-image" 
                                onClick={() => navigate("/quick-search/" + meal.meal_type)}
                            >
                                <img 
                                    src={"/Image/" + meal.image} 
                                    alt="" 
                                    className="image-item" 
                                />
                            </section>
                            <div className="quick-search-item-desc">
                                <p>{meal.name}</p>
                                <span>{meal.content}</span>
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </>
    );
}

export default QuickSearch;

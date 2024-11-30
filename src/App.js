import { Route, Routes ,  } from "react-router-dom";
import QuickSearch from "./Components/Filter/QuickSearch";
import Home from "./Components/Home/Home";
import Restaurant from "./Components/restaurant/Restaurant";
  // Ensure this path is correct
function App() {
  return (
   
    <>
    
      <main className="container-fluid">
        
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quick-search/:meal_id" element={<QuickSearch />} />
          <Route path="/restaurant/:id" element={< Restaurant/>}/>      
           </Routes>
        {/* <Home/>
        <QuickSearch/> */}
      </main>
    </>
  );
}
export default App;
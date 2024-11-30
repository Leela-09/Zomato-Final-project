function FilterOption(props) {
  let {locationList,getFilterResult} = props;
  // let _getFilterResult = (event)=>{

  // }
  return (
    <>
      <div className="food-shadow col-12 col-lg-3 col-md-4 me-5 p-3 mb-4">
        <div className="d-flex justify-content-between">
          <p className="fw-bold m-0">Filter</p>
          <button
            className="d-lg-none d-md-none btn"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFilter"
            aria-controls="collapseFilter"
          >
            <span className="fa fa-eye"></span>
          </button>
        </div>
        {/* <!-- Collapse start  --> */}
        <div className="collapse show" id="collapseFilter">
          <div>
            <label htmlFor="" className="form-label">
              Select Location
            </label>
            <select className="form-select form-select-sm">
              <option value="">Select</option>
              {
              locationList.map((location, index) => {
                return (
                  <option key={index}>
                    {location.name}, {location.city}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="mt-4 mb-2 fw-bold">Cuisine</p>
          <div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                North Indian
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                  South Indian
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                Streat Food
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                Fast Food
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
               Chines Food
              </label>
            </div>
           
          </div>
          <p className="mt-4 mb-2 fw-bold">Cost For Two</p>
          <div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" 
                name="cost"
                 value="0-500"
                onChange={(event) => {
                  getFilterResult(event,"costForTwo");
                }}/>
              <label htmlFor="" className="form-check-label ms-1">
                less then 500
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" 
                name="cost"
                 value="500-1000"
                onChange={(event) => {
                  getFilterResult(event,"costForTwo");
                }}/>
              <label htmlFor="" className="form-check-label ms-1">
                500 to 1000
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input"
                name="cost"
                   value="1000-1500"
                onChange={(event) => {
                  getFilterResult(event,"costForTwo");
                }} />
              <label htmlFor="" className="form-check-label ms-1">
                1000 to 1500
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input"
                name="cost"
                   value="1500-2000"
                onChange={(event) => {
                  getFilterResult(event,"costForTwo");
                }} />
              <label htmlFor="" className="form-check-label ms-1">
                1500 to 2000
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input"
              name="cost"
                 value="2000-9999999"
              onChange={(event) => {
                getFilterResult(event,"costForTwo");
              }} />
              <label htmlFor="" className="form-check-label ms-1">
                2000+
              </label>
            </div>
          </div>
          <p className="mt-4 mb-2 fw-bold">Sort</p>
          <div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" name="sort" value="1" 
              onChange={(event) =>{

               getFilterResult(event, "sort")}}/>
              <label htmlFor="" className="form-check-label ms-1">
                Price low to high
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" name="sort" value="-1"
              onChange={(event)=>{
                getFilterResult(event,'sort')
              }}/>
              <label htmlFor="" className="form-check-label ms-1">
                Price high to low
              </label>
            </div>
          </div>
        </div>
        {/* <!-- Collapse end --> */}
      </div>
    </>
  );
}

export default FilterOption;
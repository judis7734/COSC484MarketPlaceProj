"use client";

import React, { useState } from "react";

const categories = ["Furtniture","Electronics","Clothing","Home Decor","Appliances","Toys and games","Tools and hardware"];
const sortingOrder = ["Newest","Price Low - High", "Price High - Low"];

const filterOptions = [
    {
        id: "sort",
        title: "sorting order",
        options: sortingOrder,
        type: "radio",
    },

    {
        id: "categories",
        title: "Categories",
        options: categories,
        type: "checkbox",
    }
]


const FilterSection = () => {

    const[selectedSort,setSelectedSort] = useState("");
    const[selectedCategories,setSelectedCategories] = useState([]);

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
      };
    
      
      const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
          setSelectedCategories([...selectedCategories, value]);
        } else {
          setSelectedCategories(selectedCategories.filter((category) => category !== value));
        }
      };
    

    function checkValidQuery(queries) {
        return queries.filter((query) => query !== "").length > 0;
      }
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        {filterOptions.map((filter) => (
          <div key={filter.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{filter.title}</h3>
            <div>
              {filter.options.map((option) => {
                if (filter.type === "radio") {
                  return (
                    <label key={option} className="block mb-1">
                      <input
                        type="radio"
                        name={filter.id}
                        value={option}
                        checked={selectedSort === option}
                        onChange={handleSortChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  );
                }
                if (filter.type === "checkbox") {
                  return (
                    <label key={option} className="block mb-1">
                      <input
                        type="checkbox"
                        value={option}
                        checked={selectedCategories.includes(option)}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
  
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Filters:</h3>
          <ul className="list-disc pl-5">
            {selectedSort && <li>Sorting Order: {selectedSort}</li>}
            {selectedCategories.length > 0 && (
              <li>Categories: {selectedCategories.join(", ")}</li>
            )}
          </ul>
        </div>
      </div>
    );
}

export default FilterSection
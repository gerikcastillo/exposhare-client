import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ShopPage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import ShopContent from "../../components/ShopContent/ShopContent";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopPage({ handleChange }) {
  const location = useLocation();
  const query = useQuery();
  const [listings, setListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    search: query.get("search") || "",
    brand: query.get("brand") || "",
    condition: query.get("condition") || "",
    category: query.get("category") || "",
  });

  useEffect(() => {
    // Setting the brand filter from the query parameter
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      brand: query.get("brand"),
      search: query.get("search"),
      condition: query.get("condition") || "",
      category: query.get("category") || "",
    }));
  }, [location]);

  useEffect(() => {
    getAllListings();
  }, [selectedFilters]);

  //function get listings
  const getAllListings = async () => {
    try {
      let requestUrl = `${BASE_URL}/api/listings`;

      const queryParams = [];
      const filterKeys = ["search", "brand", "condition", "category"];

      filterKeys.forEach((key) => {
        selectedFilters[key] &&
          queryParams.push(
            `${key}=${encodeURIComponent(selectedFilters[key].toLowerCase())}`
          );
      });

      if (queryParams.length > 0) {
        requestUrl += `?${queryParams.join("&")}`;
      }
      const response = await axios.get(requestUrl);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching Listings:", error);
    }
  };

  //validation if no listings match
  if (listings.length === 0) {
    return (
      <>
        <div className="shop-page__validation">
          <p className="shop-page__validation-title">
            Sorry, there are no listings to match your search.
          </p>
          <p className="shop-page__validation-art">(っ◞‸◟ c)</p>
        </div>
      </>
    );
  }

  return (
    <div className="shop-page">
      <section className="shop-page__container">
        <h1 className="shop-page__title">
          Shop{" "}
          <span className="shop-page__results">
            {" "}
            ({listings.length} {listings.length === 1 ? "result" : "results"})
          </span>
        </h1>
        <ShopContent listings={listings} handleChange={handleChange} />
      </section>
    </div>
  );
}

export default ShopPage;

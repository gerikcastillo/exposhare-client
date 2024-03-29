import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import SellPage from "./pages/SellPage/SellPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log("Initial isAuthenticated:", isAuthenticated);
    async function fetchProfileData() {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${BASE_URL}/users/my-profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setProfileData(res.data);
        } catch (err) {
          console.log("Error fetching profile data", err);
        }
      }
    }

    fetchProfileData();
  }, [isAuthenticated]);

  //handlechange function for changes in the user's authentication status or profileData
  function handleChange(isAuthenticated, newProfileData = null) {
    setProfileData(newProfileData);
    setIsAuthenticated(isAuthenticated);
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header
          profileData={profileData}
          isAuthenticated={isAuthenticated}
          handleChange={handleChange}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage profileData={profileData} />}
          />
          <Route
            path="/shop"
            element={<ShopPage handleChange={handleChange} />}
          />
          <Route
            path="/users/my-profile"
            element={
              <ProfilePage
                handleChange={handleChange}
                profileData={profileData}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage handleChange={handleChange} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage handleChange={handleChange} />}
          />
          <Route
            path="/users/favorites"
            element={
              <FavoritesPage
                handleChange={handleChange}
                profileData={profileData}
              />
            }
          />
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/faq" element={<FAQPage />}></Route>
          <Route
            path="/sell"
            element={
              <SellPage handleChange={handleChange} profileData={profileData} />
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

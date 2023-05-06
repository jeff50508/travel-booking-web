import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Index from "./pages/index";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import Page404 from "./pages/page404";
import Register from "./pages/register";
import PlacePage from "./pages/placepage"
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import Account from "./pages/account";
import PlacesPage from "./pages/placespage";
import PlacesFormPage from "./pages/placesformpage";
import Booking from "./pages/booking";
import Bookings from "./pages/bookings";

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true;

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />}></Route>
            <Route path="register" element={<Register/>}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="account" element={<Account/>}></Route>
            <Route path="account/places" element={<PlacesPage/>}></Route>
            <Route path="account/places/new" element={<PlacesFormPage/>}></Route>
            <Route path="account/places/:id" element={<PlacesFormPage/>}></Route>
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="logout" element={<Logout/>}></Route>
            {/* <Route path="profile" element={<Profile/>}></Route> */}
            <Route path="account/bookings" element={<Bookings />}></Route>
            <Route path="account/bookings/:id" element={<Booking />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
        </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
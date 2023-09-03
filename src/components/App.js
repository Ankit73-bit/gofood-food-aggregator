import Home from "../screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import "./../../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "./../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { CartProvider } from "./ContextReducer";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home search={search} onSetSearch={setSearch} />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

import { useEffect, useState } from "react";

import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout/Layout.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Home from "./pages/Home/Home.jsx";
import Todo from "./pages/Todo/Todo.jsx";
import Calculator from "./pages/Calculator/Calculator.jsx";
import Components from "./pages/Components/Components.jsx";
import Products from "./pages/Products/Products.jsx";
import Carts from "./pages/Carts/Carts.jsx";
import Login from "./pages/Login/Login.jsx";
import Ball from "./pages/Ball/Ball.jsx";

import { fetchProducts } from "./data/products.jsx";
import "./App.css";
// HasRouter, BrowserRouter,MemoryRouter

const intTab = "home";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  useEffect(() => {
    setTab(intTab);
  }, []);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  products={products}
                  carts={carts}
                  tab={tab}
                  setTab={setTab}
                  setToken={setToken}
                />
              }
            >
              <Route path={"/"} element={<Home />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/ball"} element={<Ball />} />
              <Route path={"/todo"} element={<Todo />} />
              <Route path={"/calculator"} element={<Calculator />} />
              <Route path={"/components/components"} element={<Components />} />
              <Route
                path={"/products"}
                element={
                  <Products
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path={"/carts"}
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;

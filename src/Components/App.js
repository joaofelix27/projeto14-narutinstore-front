import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../assets/globalstyle";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Produto from "./Produto";
import Home from "./Home";
import Cart from "./Cart";
import UserContext from "./UserContext";

function App() {
  const [login, setLogin] = useState({});
  const [chosenProducts, setChosenProducts] = useState([]);

  const contextValue = {
    login,
    setLogin,
    chosenProducts,
    setChosenProducts,
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Cadastro />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:name" element={<Produto />} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

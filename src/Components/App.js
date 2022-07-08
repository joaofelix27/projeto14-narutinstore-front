import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../assets/globalstyle";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Home from "./Home";
import UserContext from "./UserContext";

function App() {
  const [token, setToken] = useState("");

  const contextValue = { token, setToken };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

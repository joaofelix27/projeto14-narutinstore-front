import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import Narutin from "../assets/images/logoNarutin.png";

function Login() {
  const { login, setLogin } = useContext(UserContext);
  const { viaCart, setViaCart } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  function fazerLogin(event) {
    event.preventDefault();

    if (email !== "") {
      const URL = `http://localhost:5000/login`;
      const profileData = {
        email: email,
        password: senha,
      };
      const promise = axios.post(URL, profileData);
      promise
        .then((response) => {
          const { data } = response;
          const loginData = { ...data };
          const strLoginData = JSON.stringify(data);
          window.localStorage.setItem("loginData", strLoginData);
          setLogin(loginData);
          if (viaCart) {
            navigate("/payment");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          alert("Erro no Login, dados incorretos!");
        });
    }
  }

  function montarFormularioLogin() {
    return (
      <>
        <form>
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <button type="submit">Entrar</button>
        </form>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <h1>Primeira vez? Cadastre-se!</h1>
        </Link>
      </>
    );
  }

  const formularioLogin = montarFormularioLogin();
  return (
    <Container>
      <Header>
        <img src={Narutin} />
        <div>
          <h1>Narutin</h1>
        </div>
      </Header>
      <FormularioLogin onSubmit={fazerLogin}>{formularioLogin}</FormularioLogin>
    </Container>
  );
}
export default Login;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 159px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  div {
    margin-top: 17px;
    h1 {
      font-family: Permanent Marker;
      font-size: 32px;
      font-weight: 400;
      line-height: 47px;
      letter-spacing: 0em;
      color:#fafafa;
    }
  }
  img {
    width: 70px;
  }
`;
const FormularioLogin = styled.div`
  padding-top: 24px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 58px;
    width: 326px;
    border-radius: 5px;
    background-color: #000000;
    border: 0px;
    margin-bottom: 13px;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;

    padding: 16px;
  }
  button {
    border: 0px;
    background-color: #ea8b1c;
    height: 46px;
    width: 326px;
    border-radius: 5px;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    color: #000000;
    margin-bottom: 32px;
  }
  h1 {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    color: #000000;
    text-align: center;
  }
`;

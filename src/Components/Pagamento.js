import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import Narutin from "../assets/narutin.png";

export default function Pagamento() {
  const { login, setLogin } = useContext(UserContext);
  const { viaCart, setViaCart } = useContext(UserContext);
  const { chosenProducts, setChosenProducts } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const productsLocal = window.localStorage.getItem("Products");
    const productsLocalOBJ = JSON.parse(productsLocal);
    setChosenProducts(productsLocalOBJ);
  }, []);

  function buyProduct(event) {
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
            navigate("/cart");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          alert("Erro no Login, dados incorretos!");
        });
    }
  }
  function montarReview() {
    return (
      <>
        <h1>RESUMO</h1>
        <BodyReview>
          {chosenProducts.map((value) => {
            return (
              <>
                <div>
                  <h2>{`(${value.quantityPurchased}x)`}</h2>
                  <h2>{value.name}</h2>
                </div>
              </>
            );
          })}
        </BodyReview>
      </>
    );
  }
  function montarFormCreditCard() {
    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Nome impresso no cartão"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Digitos do cartão"
            required
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <Codigo>
            <input
              type="text"
              placeholder="Código de segurança"
              required
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Validade"
              required
              onChange={(e) => setSenha(e.target.value)}
            ></input>
          </Codigo>
          <button type="submit">Fechar Compra</button>
        </form>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <h1>Primeira vez? Cadastre-se!</h1>
        </Link>
      </>
    );
  }

  const formCreditCard = montarFormCreditCard();
  const review = montarReview();
  return (
    <Container>
      <Header>
        <img src={Narutin} />
        <div>
          <h1>Narutin</h1>
        </div>
      </Header>
      <Body>
        <Review>{review}</Review>
        <FormPayment onSubmit={buyProduct}>{formCreditCard}</FormPayment>
      </Body>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 30px;
  background-color: #000000;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background: rgb(249, 125, 0);
  background: linear-gradient(
    90deg,
    rgba(249, 125, 0, 1) 37%,
    rgba(255, 161, 53, 1) 74%,
    rgba(255, 173, 40, 1) 92%
  );
  div {
    margin-top: 17px;
    h1 {
      font-family: Permanent Marker;
      font-size: 32px;
      font-weight: 400;
      line-height: 47px;
      letter-spacing: 0em;
      color: #fafafa;
    }
  }
  img {
    height: 100px;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  padding-top: 20px;
  background-color: #000000;
  margin-top:60px;
`;
const Review = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  h1 {
    font-family: Permanent Marker;
    font-size: 32px;
    font-weight: 400;
    line-height: 47px;
    letter-spacing: 0em;
    color: #fafafa;
    font-family: Permanent Marker;
    font-size: 32px;
    font-weight: 400;
    line-height: 47px;
    letter-spacing: 0em;
    color: #fafafa;
  }
`;
const BodyReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  min-height: 40px;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 6px;
  div {
    display: flex;
  }
  h2 {
    margin-right: 3px;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    color: #000000;
    text-align: left;
  }
`;
const FormPayment = styled.div`
  padding-top: 24px;
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 58px;
    width: 100%;
    border-radius: 5px;
    background: rgb(249, 125, 0);
    background: linear-gradient(
      90deg,
      rgba(249, 125, 0, 1) 37%,
      rgba(255, 161, 53, 1) 74%,
      rgba(255, 173, 40, 1) 92%
    );
    border: 0px;
    margin-bottom: 13px;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
    padding: 8px;
  }
  button {
    border: 0px;
    background-color: #ea8b1c;
    height: 46px;
    width: 100%;
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
const Codigo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  input {
    width: 48%;
    background-color: blue;
  }
`;

import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Narutin from "../assets/narutin.png";
import { useNavigate } from "react-router-dom";

export default function Produto() {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
  const [cep, setCep] = useState(0);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  function descobreCEP(event) {
    event.preventDefault();
    const URL = `https://viacep.com.br/ws/${cep}/json/`;
    const promise = axios.get(URL);
    if (cep !== 0) {
      promise
        .then((response) => {
          const { data } = response;
          console.log(data);
        })
        .catch((err) => {
          console.log("Carregando");
        });
    }
  }

  useEffect(() => {
    const URL = `http://localhost:5000/products/${name}`;
    const promise = axios.get(URL);
    promise
      .then((response) => {
        const { data } = response;
        console.log(data);
        const valor = Number(data.value).toFixed(2).replace(".", ",");
        setValue(valor);
        setProduct(data);
      })
      .catch((err) => {
        console.log("Carregando");
      });
  }, []);
  return (
    <Container>
      <Header>
        <img src={Narutin} />
        <div>
          <h1>Narutin</h1>
        </div>
      </Header>
      <Body>
        <Description>
          <h1>{name}</h1>
        </Description>
        <ProductBody>
          <Image>
            <img src={product.image} />
          </Image>
          <Value>
            <h2> {product.description}</h2>
            <h1> {`R$ ${value}`}</h1>
          </Value>
          <Purchase>
            <div>
              <ion-icon name="cart-outline"></ion-icon>
              <h1>COMPRAR</h1>
            </div>
          </Purchase>
        </ProductBody>
        <Bottom>
          <Adress>
            <h1>Consultar frete e prazo de entrega</h1>
            <form onSubmit={descobreCEP}>
              <input
                type="number"
                placeholder="Digite seu CEP..."
                onChange={(e) => setCep(e.target.value)}
              ></input>
              <button type="submit">OK</button>
              <a
                target="_blank"
                href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
              >
                Não lembro meu CEP
              </a>
            </form>
          </Adress>
        </Bottom>
      </Body>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  cursor: pointer;
  padding-top: 95px;
  padding-bottom: 100px;
  background-color: #000000;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: fixed;
  top: 0;
  height: 90px;
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
    }
  }
  img {
    width: 70px;
  }
`;
const Body = styled.div`
  img {
    width: 80px;
    height: 80px;
  }
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 30px;
  width: 95%;
  height: auto;
  background-color: #fafafa;
  padding: 6px;
`;
const Description = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
`;
const ProductBody = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border: 2px solid #f47213;
  width: 100%;
  height: auto;
  border-radius: 10px;
  img {
    width: 100%;
    height: auto;
    max-width: 300px;
  }
`;
const Value = styled.div`
  background: rgb(255, 161, 53);
  background: linear-gradient(
    90deg,
    rgba(255, 161, 53, 1) 0%,
    rgba(255, 158, 0, 1) 34%,
    rgba(249, 125, 0, 1) 93%
  );
  word-wrap: break-word;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 10px;
  border: 2px solid #f47213;
  width: 100%;
  h2 {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  h1 {
    font-family: Raleway;
    font-size: 22px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Adress = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-family: "Poppins", sans-serif;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #f47213;
      text-decoration: underline;
    }
    button {
      height: 36px;
      border: 1px solid #f47213;
      color: #f47213;
      font-weight: 700;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      letter-spacing: 0em;
      border-radius: 5px;
    }
    input {
      margin-top: 13px;
      margin-bottom: 13px;
      height: 20px;
      width: 50%;
      border-radius: 5px;
      background: rgb(255, 161, 53);
      background: linear-gradient(
        90deg,
        rgba(255, 161, 53, 1) 0%,
        rgba(255, 158, 0, 1) 34%,
        rgba(249, 125, 0, 1) 93%
      );
      border: 0px;
      font-family: Raleway;
      font-size: 14px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
      color: #fafafa;
      padding: 16px;
      border: 2px solid #f47213;
    }
  }
`;
const Purchase = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 100%;
    border: 1px solid #f47213;
    color: #f47213;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    letter-spacing: 0em;
    border-radius: 5px;
    ion-icon {
      font-size: 30px;
      color: #f47213;
      margin-right: 5px;
    }
  }
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

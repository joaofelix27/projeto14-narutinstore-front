import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Narutin from "../assets/narutin.png";
import { useNavigate } from "react-router-dom";

export default function Produto() {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `http://localhost:5000/products/${name}`;
    const promise = axios.get(URL);
    promise
      .then((response) => {
        const { data } = response;
        console.log(data);
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
            <h1> {`R$ ${product.value},00`}</h1>
          </Value>
        </ProductBody>
        <Bottom>
          <Adress>
            <h1>Consultar frete e prazo de entrega</h1>
            <input type="number" placeholder="Digite seu CEP..."></input>
          </Adress>
          <Purchase>
            <button>COMPRAR</button>
            <button>VOLTAR PARA LISTA DE PRODUTOS</button>
          </Purchase>
        </Bottom>
      </Body>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  cursor: pointer;
  padding-top: 95px;
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
  margin: 0 20px;
  margin-top: 40px;
  width: 80%;
  height: 80%;
  background-color: #fafafa;
  padding: 20px;
`;
const Description = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  h1 {
    font-family: Raleway;
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
  margin-bottom: 30px;
`;
const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border: 2px solid #f47213;
  width: 50%;
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
  padding: 20px;
  border-radius: 10px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 2px solid #f47213;
  width: 50%;
  word-break: break-all;
  h2 {
    font-family: Raleway;
    font-size: 20px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    margin-bottom: 20px;
  }
  h1 {
    font-family: Raleway;
    font-size: 30px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    margin-bottom: 20px;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;
const Adress = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const Purchase = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

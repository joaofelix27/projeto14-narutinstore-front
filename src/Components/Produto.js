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
        <div></div>
      </Header>
      <Body>
        <div>
          {product.length !== 0 ? <img src={product[0].image} /> : "careegando"}
        </div>
        <h1>{name}</h1>
      </Body>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  padding-top: 95px;
  background-color: #000000;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 90px;
  background-color: #f47213;
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
img{
    width:80px;
    height:80px
}
  display: flex;
  border-radius: 10px;
  margin: 0 20px;
  margin-top: 30px;
  width: 80%;
  height: 80%;
  background-color: #fafafa;
`;

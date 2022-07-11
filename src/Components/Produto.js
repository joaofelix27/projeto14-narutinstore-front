import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import Narutin from "../assets/images/logoNarutin.png";
import { useNavigate } from "react-router-dom";

export default function Produto() {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
  const [frete, setFrete] = useState(0);
  const [cep, setCep] = useState("");
  const [qtd, setQtd] = useState("");
  const navigate = useNavigate();
  const { chosenProducts, setChosenProducts } = useContext(UserContext);
  const [value, setValue] = useState(0);

  function adicionarCarrinho(event) {
    setQtd("");
    event.preventDefault()
    const newProducts = [...chosenProducts];
    const currentProduct = {... product}
    const repeatedProduct=  chosenProducts.findIndex( value => value.name===product.name )
    if (repeatedProduct !==-1) {
      newProducts[repeatedProduct].quantityPurchased+=Number(qtd)
    } else {
      currentProduct.quantityPurchased=Number(qtd)
      newProducts.push(currentProduct)
    }
    setChosenProducts(newProducts);
    const strProducts = JSON.stringify(newProducts);
    window.localStorage.setItem("Products", strProducts);
    navigate("/cart")
  }

  function descobreFrete(regiao) {
    let frete = 0;
    if (regiao === "N") {
      frete = "40,00";
    } else if (regiao === "NE") {
      frete = "80,00";
    } else if (regiao === "SE") {
      frete = "120,00";
    } else if (regiao === "S") {
      frete = "160,00";
    } else if (regiao === "CO") {
      frete = "100,00";
    } else {
      return "";
    }
    return frete;
  }
  function descobreCEP(event) {
    event.preventDefault();
    if (cep.length === 8) {
      const URL = `https://viacep.com.br/ws/${cep}/json/`;
      const promise = axios.get(URL);
      if (cep !== 0) {
        promise
          .then((response) => {
            const { data } = response;
            console.log(data.ibge);
            const URL2 = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${data.ibge}`;
            const promisseIBGE = axios.get(URL2);
            promisseIBGE
              .then((res) => {
                const sigla = res.data.sigla;
                const freteRegiao = descobreFrete(sigla);
                setFrete(freteRegiao);
                setCep("");
              })
              .catch((err0) => {
                console.log("Erro IBGE");
              });
          })
          .catch((err) => {
            console.log("Carregando");
          });
      }
    } else {
      setFrete("");
    }
  }

  useEffect(() => {
    const URL = `http://localhost:5000/products/${name}`;
    const promise = axios.get(URL);
    promise
      .then((response) => {
        const { data } = response;
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
            <div>
              <h1> {`R$ ${value}`}</h1>
              <h3> {`Em estoque: ${product.quantity}`}</h3>
            </div>
          </Value>
          <Purchase onSubmit={adicionarCarrinho}>
            <button type="submit">
              <ion-icon name="cart-outline"></ion-icon>
              <h1>COMPRAR</h1>
            </button>
            <input
              type="number"
              required
              placeholder="Qntd"
              value={qtd}
              min="1"
              onChange={(e) => setQtd(e.target.value)}
              title={"Digite a quantidade"}
            ></input>
          </Purchase>
        </ProductBody>
        <Bottom>
          <Adress>
            <h1>Consultar valor do frete </h1>
            <form onSubmit={descobreCEP}>
              <CEP frete={frete}>
                <input
                  type="text"
                  placeholder="Digite seu CEP..."
                  required
                  value={cep}
                  pattern="[0-9]+"
                  onChange={(e) => setCep(e.target.value)}
                  title={"Digite apenas os 8 números do CEP"}
                ></input>
                <span>
                  {" "}
                  {frete === 0
                    ? ""
                    : frete === ""
                    ? "CEP Inválido!"
                    : `Valor do frete: R$ ${frete}`}
                </span>
              </CEP>

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
  min-height: 100vh;
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
  div {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
  h2 {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  h3 {
    font-family: Raleway;
    font-size: 20px;
    font-weight: 500;
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
    margin-top: 13px;
    margin-bottom: 2px;
    display: flex;
    align-items: top;
    justify-content: space-between;
    border: 0px;
    a {
      margin-top: 10px;
      width: 40%;
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
  }
`;
const Purchase = styled.form`
  display: flex;
  input {
    width:20%;
    height: 36px;
    border-radius: 5px;
    background: rgb(255, 161, 53);
    background: linear-gradient(
      90deg,
      rgba(255, 161, 53, 1) 0%,
      rgba(255, 158, 0, 1) 34%,
      rgba(249, 125, 0, 1) 93%
    );
    border: 2px solid #f47213;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #fafafa;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 85%;
    margin-right:5px;
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

const CEP = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  input {
    height: 20px;
    border-radius: 5px;
    background: rgb(255, 161, 53);
    background: linear-gradient(
      90deg,
      rgba(255, 161, 53, 1) 0%,
      rgba(255, 158, 0, 1) 34%,
      rgba(249, 125, 0, 1) 93%
    );
    border: 2px solid #f47213;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #fafafa;
    padding: 16px;
  }
  span {
    font-family: "Poppins", sans-serif;
    font-size: 10px;
    font-weight: 700;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0em;
    color: ${(props) => (props.frete === "" ? "#ff0000" : "#000000")};
  }
`;

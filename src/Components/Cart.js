import { useState, useContext, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/images/logoNarutin.png"
import UserContext from "./UserContext";

export default function Cart() {
    const [frete, setFrete] = useState(0);
    const [cep, setCep] = useState("");
    const navigate = useNavigate();
    const [logOutBox, setLogOutBox] = useState(false)
    const [unLoged, setUnLoged]=useState(true)
    const { viaCart, setViaCart } = useContext(UserContext);
    const formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });

    const inCart=eval(localStorage.getItem("Products"));
    const loginData=JSON.parse(localStorage.getItem("loginData"))

    useEffect(()=>{
        setUnLoged(!loginData)
    },[])
    function ProductCart({ image, name, value, quantity }) {
        return (
            <InCartProduct>
                <img src={image} />
                <span>{name}</span>
                <span>{quantity}</span>
                <span>{formatter.format(value*quantity)}</span>
            </InCartProduct>
        )
    }

    function nextPage(){
        if(Number(frete)===0){
            alert("Preencha o campo de CEP")
        }
        else{
            if(loginData){
                navigate("/payment")
            }
            else{
                navigate("/login")
                setViaCart(true)
            }
        }
    }

    function userAction(){
        if(unLoged){
            navigate("/login")
        }
        else{
            setLogOutBox(!logOutBox)
        }
    }

    function ValuesSummary() {
        let productsValue=0;

        for(let i of inCart){
            productsValue+=(i.value*i.quantityPurchased)
        }
        return (
            <Summary>
                <Prices><span>Valor dos Produtos:</span><span>{formatter.format(productsValue)}</span></Prices>
                <Prices><span>Valor do Frete</span><span>{formatter.format(frete)}</span></Prices>
                <Prices><span>Total:</span><span>{formatter.format(Number(frete)+productsValue)}</span></Prices>
                <NavigationBar>
                    <Link to="/">Continuar Comprando</Link>
                    <button onClick={() => nextPage()}>
                        {loginData?"Ir Para Pagamento":"Ir Para Login"}
                    </button>
                </NavigationBar>
            </Summary>
        )
    }

    function descobreFrete(regiao) {
        let frete = 0;
        if (regiao === "N") {
            frete = "40.00";
        } else if (regiao === "NE") {
            frete = "80.00";
        } else if (regiao === "SE") {
            frete = "120.00";
        } else if (regiao === "S") {
            frete = "160.00";
        } else if (regiao === "CO") {
            frete = "100.00";
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

    function logOut(){
        localStorage.removeItem("Products");
        localStorage.removeItem("loginData");
        setUnLoged(true)

        const config = {
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        };
        const promise = axios.delete("http://localhost:5000/sessions", config);
        promise.then(()=>navigate("/"));
    }

    if(!inCart){
        return(
            <Main>
                <Header>
                <div onClick={() => navigate("/")}>
                    <img src={logo} alt="Logo narutin" />
                    <h1>Narutin</h1>
                </div>
                <div>
                    <LoginIcon>
                        <ion-icon name="person" onClick={()=>userAction()}></ion-icon>
                        <span>{unLoged?"Faça o Login":`Olá, ${loginData.name.split(" ")[0]}`}</span>
                    </LoginIcon>
                </div>
                </Header>
                {logOutBox?<LogOut onClick={()=>logOut()}>Sair</LogOut>:""}
                <SubTitle>O seu carrinho está vazio.</SubTitle>
                <NavigationBar>
                    <button onClick={()=>navigate("/")}>Continuar Comprando</button>
                </NavigationBar>
            </Main>
        )
    }
    else{
        return (
            <Main>
                <Header>
                    <div onClick={() => navigate("/")}>
                        <img src={logo} alt="Logo narutin" />
                        <h1>Narutin</h1>
                    </div>
                    <div>
                        <LoginIcon>
                            <ion-icon name="person" onClick={()=>userAction()}></ion-icon>
                            <span>{!loginData?"Faça o Login":`Olá, ${loginData.name.split(" ")[0]}`}</span>
                        </LoginIcon>
                    </div>
                </Header>
                {logOutBox?<LogOut onClick={()=>logOut()}>Sair</LogOut>:""}
                <SubTitle>Selecione o Endereço</SubTitle>
                <SearchCEPBox>
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
                                        : `Valor do frete: R$ ${formatter.format(frete)}`}
                            </span>
                        </CEP>
                        <NavigationBar>
                        <button type="submit">OK</button>
                        <a
                            target="_blank"
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                        >
                            Não lembro meu CEP
                        </a>
                        </NavigationBar>
                    </form>
                </SearchCEPBox>
                <SubTitle>Produtos</SubTitle>
                <Summary>
                    {inCart.map(product=><ProductCart image={product.image} name={product.name} quantity={product.quantityPurchased} value={product.value} />)}
                </Summary>
                <SubTitle>Resumo</SubTitle>
                <ValuesSummary />
            </Main>
        )
    }
}

const Main = styled.div`
    padding-top: 105px;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right:10px;
    display: flex;
    flex-direction: column;
    min-width:100vw;
    min-height: 100vh;
    align-items: center;
    background-color: #000000;
`


const Header = styled.header`
    width: 100%;
    height: 85px;
    background: rgb(255, 161, 53);
    background: linear-gradient(
      90deg,
      rgba(255, 161, 53, 1) 0%,
      rgba(255, 158, 0, 1) 34%,
      rgba(249, 125, 0, 1) 93%
      );
    display: flex;
    justify-content: space-between;
    align-items:center;
    position: fixed;
    top: 0;
    left: 0;

    h1{
        font-family: 'Permanent Marker';
        font-weight: 400;
        font-size: 32px;
        color:#fafafa;
    }

    div{
        display:flex;
        align-items:center;
        img {
    width: 70px;
  }
    }


    ion-icon{
        font-size: 32px;
        color:#000000;
        margin-right: 15px;
    }
`
const LoginIcon= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    max-width: 42px;
    
    ion-icon{
        font-size: 24px;
        color:#fafafa;
        margin-bottom: 5px;
    }

    span{
        font-size: 8px;
        text-align: center;
        margin-right: 15px;color:#fafafa;
    }
`

const SearchCEPBox = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding:10px;
`

const Summary = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding:10px;
    display: flex;
    flex-direction:column;
`

const Prices = styled.div`
    display:flex;
    width:100%;
    justify-content:space-between;
    margin-bottom: 10px;
`

const SubTitle = styled.h1`
    font-family: 'Permanent Marker';
    font-weight: 400;
    font-size: 32px;
    color:#ffffff;
    margin-bottom: 20px;
    text-align: center;
`

const InCartProduct = styled.div`
    display: flex;
    width:100%;
    margin-bottom:10px;
    align-items: center;
    justify-content: space-between;

    img{
        width:88px;
    }

    div{
        display:flex;
        flex-direction:column;
    }

    span{
        max-width:40%;
    }

    input{
        width:40px;
        height:40px
    }
`

const NavigationBar = styled.div`
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items: center;

    a{
        color:#F47213;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
        font-size: 14px;
    }

    button {
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
      border: hidden;
      font-weight: 700;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      color: #ffffff
    }
`

const CEP = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    font-family: "Raleway";
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #fafafa;
    padding: 16px;
    margin-bottom: 10px;
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

const LogOut= styled.div`
    color:#000000;
    font-weight: 400;
    border-radius: 5px;
    font-size:14px;
    padding: 6px;
    background-color: #ffffff;
    position:fixed;
    top:85px;
    right:10px;
`